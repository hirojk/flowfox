<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <q-page-container>
      <router-view class="page page--component" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import SideBar from '@components/sidebar/SideBar.vue'
  import { useProjectStore } from '@stores/projectStore'

  const projectStore = useProjectStore()

  onMounted(async () => {
    if (!projectStore.allProjects.length) {
      await projectStore.loadProjects()
    }
  })
</script>

<style lang="scss">
  .page--component {
    box-shadow: -1em 0 2em rgba($pw-black, 0.1);
    z-index: 1000;
  }
</style>
