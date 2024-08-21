<script setup lang="ts">
import {type GetUser} from "@/shared";

type Props = Pick<GetUser, 'id' | 'username' | 'email'> & {
  isSelected: boolean;
};

const props = defineProps<Props>();


const emit = defineEmits(['userClick']);

const handleClick = () => {
  emit('userClick');
};
</script>


<template>
  <div
    :class="$style['preview']"
    @click="handleClick"
  >
    <div>
      <img
        src="/default.png"
        :alt="username"
        :class="$style['preview-image']"
      >
    </div>
    <div :class="[$style['preview-info'], { [$style['selected']]: props.isSelected }]">
      <span
        :class="[$style['truncate'], $style['username']]"
        :title="username"
      >{{ username }}</span>
      <span
        :class="[$style['truncate']]"
        :title="email"
      >{{ email }}</span>
    </div>
  </div>
</template>


<style lang="scss" module>
.preview {
  border-radius: var(--s-border-radius);
  box-shadow: var(--sd-default);
  height: 70px;
  display: flex;
  width: 240px;
  cursor: pointer;
  font-size: 0.87em;
  &:hover {
    opacity: .8;
  }
  &-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-right: 1px solid var(--s-border-color);
  }
  &-info {
    display: flex;
    flex-flow: column;
    gap: 5px;
    padding:  15px;
    flex: 1;
    max-width: 180px;
  }

  .username {

    font-weight: 600;
  }


  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}

.selected {
  background: #E0E0E0;
}
</style>
