<script setup lang="ts">
import {UiContainer} from "@/shared";
import {Sidebar} from "@/widgets";

</script>
<template>
  <UiContainer>
    <section :class="$style['header']">
      <h1 :class="$style['header--title']">
        Жилфонд
      </h1>
      <div>Пользователь</div>
    </section>
    <div :class="$style['wrapper']">
      <Sidebar />
      <slot />
    </div>
  </UiContainer>
</template>


<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--title {
    color: var(--c-primary);
  }
}
.wrapper {
  box-shadow: var(--sd-default);
  border-radius: var(--s-border-radius);
  display: flex;
  min-height: 589px;
}
</style>

