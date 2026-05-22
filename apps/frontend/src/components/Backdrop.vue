<template>
  <div
    v-if="appStore.isSidebarOpen"
    class="page__backdrop"
    aria-hidden="true"
    @click="appStore.isSidebarOpen = false"
  ></div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@stores/appStore'

  const appStore = useAppStore()
</script>

<style lang="scss" scoped>
  .page__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($ff-senary, 0.5);
  }
</style>
