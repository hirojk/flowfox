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
  import { useProjectStore } from '@stores/homeStore.ts'

  const projectStore = useProjectStore()

  import SideBar from '@components/SideBar.vue'

  onMounted(async () => {
    if (!projectStore.allProjects.length) {
      await projectStore.loadProjects()
    }
  })
</script>

<style lang="scss">
  .page--component {
    background-color: $ff-tertiary;
  }
</style>
