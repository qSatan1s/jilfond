<script setup lang="ts">
import {GetUser, UiInput, UiLoader} from "@/shared";
import {computed, ComputedRef, ref, watch} from "vue";
import { useStore } from "vuex";
import {PreviewUsers} from "@/feature";
import { debounce } from "@/shared";
import { searchModel } from '@/entities';
import {useRouter} from "vue-router";

const search = ref<string>('');
const store = useStore();
const router = useRouter();

const users: ComputedRef<GetUser[]> = computed(() => store.getters[searchModel.getters.getSearchResult]);
const selectedUser: ComputedRef<GetUser | null> = computed(() => store.getters[searchModel.getters.getSelectedUser]);
const isLoading: ComputedRef<boolean> = computed(() => store.state[searchModel.NAMESPACE].isDetailsLoading);

const debouncedSearch = debounce((searchText: string) => {
  store.dispatch(searchModel.actions.getSearchPeople, searchText);
}, 200);


const onSearch = (searchText: string) => {
    debouncedSearch(searchText);
};


const onUserClick = (user: GetUser) => {
  store.dispatch(searchModel.actions.selectUser, user);
  router.push({ name: 'Profile', params: { id: user.id } });
};


watch(search, (newValue) => {
  if (newValue.trim() === '') {
    router.push({ name: 'Home' });
  }
});
</script>

<template>
  <div :class="$style['sidebar']">
    <h6 :class="$style['sidebar--title']">
      Поиск сотрудников
    </h6>

    <UiInput
      v-model="search"
      width="246"
      placeholder="Введите Id или имя"
      @input="onSearch(search)"
    />

    <h6 :class="$style['sidebar--title']">
      Результаты
    </h6>
    <section>
      <div
        v-if="isLoading"
        :class="$style['sidebar-loader']"
      >
        <ui-loader />
      </div>

      <span
        v-else-if="!search.length && !isLoading && !users.length"
        :class="$style['notification']"
      >
        начните поиск
      </span>

      <span
        v-else-if="search.length && !users.length && !isLoading"
        :class="$style['notification']"
      >
        ничего не найдено
      </span>

      <div
        v-if="users.length && !isLoading"
        :class="$style['preview-container']"
      >
        <PreviewUsers
          v-for="user in users"
          :id="user.id"
          :key="user.id"
          :username="user.username"
          :email="user.email"
          :isSelected="user.id === selectedUser?.id"
          @user-click="onUserClick(user)"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" module>
.sidebar {
  width: 293px;
  padding: 23px 27px;
  border-right: 1px solid var(--s-border-color);
}

.sidebar--title {
  font-weight: 700;
  font-size: 1em;
  margin-top: 22px;
  margin-bottom: 10px;
  &:first-child {
    margin-bottom: 22px;
  }
}

.sidebar-loader {
  text-align: center;
}

.preview-container {
  display: grid;
  gap: 10px;
}

.notification {
  font-size: 0.87em;
  color: var(--c-value);
}
</style>
