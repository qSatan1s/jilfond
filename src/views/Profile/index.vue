<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useStore } from 'vuex';
import {GetUser, UiLoader} from "@/shared";
import { computed, ComputedRef } from "vue";
import { searchModel } from "@/entities";

const route = useRoute();
const store = useStore();
const router = useRouter();

const userId = computed(() => route.params.id as string);
const isLoading = ref<boolean>(true);

const user: ComputedRef<GetUser | null> = computed(() => store.getters[searchModel.getters.getSelectedUser]);

onMounted(async () => {
  try {
    await store.dispatch('search/selectUser', null);
    await store.dispatch(searchModel.actions.getUserById, userId.value);

    if (!user.value) {
      await router.push('/');
    }
  } finally {
    isLoading.value = false;
  }
});
</script>



<template>
  <div :class="$style['profile']">
    <div
      v-if="isLoading"
      :class="$style['loader-container']"
    >
      <ui-loader />
    </div>
    <div
      v-else-if="user"
      :class="$style['profile-content']"
    >
      <div>
        <img
          src="/default.png"
          :class="$style['profile-image']"
          :alt="user?.username"
        >
      </div>
      <div :class="$style['profile-info']">
        <h4>{{ user?.name }}</h4>
        <p :class="$style['profile-title']">
          email: <span :class="$style['profile-value']">{{ user?.email }}</span>
        </p>

        <p :class="$style['profile-title']">
          phone: <span :class="$style['profile-value']">{{ user?.phone }}</span>
        </p>

        <h4>О себе: </h4>
        <p :class="$style['profile-value']">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" module>
.profile {
  display: flex;
  padding: 30px 21px;
  gap: 60px;
  width: 100%;
}

.profile-content {
  display: flex;
  gap: 30px;
}

.profile-image {
  width: 424px;
  height: 286px;
  border: 1px solid var(--s-border-color);
}

.profile-title {
  font-weight: 600;
  font-size: 0.87em;
}

.profile-value {
  font-size: 0.87em;
  font-weight: 400;
  color: var(--c-value);
}

.loader-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

</style>
