<script lang="ts" setup>
import {DefaultLayout} from "@/widgets";
import {Notification} from "@/feature";
</script>

<template>
  <DefaultLayout>
    <Notification />
    <RouterView />
  </DefaultLayout>
</template>

<style lang="scss">
@import "./shared/styles/index.scss";
</style>
