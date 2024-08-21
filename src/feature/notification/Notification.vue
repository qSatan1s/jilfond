<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const message = ref<string | null>(null);

watch(() => store.state.search.errorMessage, (newMessage) => {
  message.value = newMessage;

  if (newMessage) {
    setTimeout(() => {
      store.commit('search/CLEAR_ERROR');
    }, 3000);
  }
});
</script>

<template>
  <div
    v-if="message"
    class="notification"
  >
    {{ message }}
  </div>
</template>

<style scoped>
.notification {
  background-color: red;
  color: white;
  padding: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 5px;
}
</style>
