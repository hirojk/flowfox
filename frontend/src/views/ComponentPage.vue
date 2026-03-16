<template>
  <component :is="currentComponent" />
</template>

<script setup lang="ts">
  import { onMounted, computed, type Component } from 'vue'
  import { useComponentResolver } from '@composables/useNavigation'
  import Board from '@components/board/BoardPage.vue'
  import { useProjectStore } from '@stores/homeStore.ts'

  const projectStore = useProjectStore()
  const { activeComponent } = useComponentResolver()

  const componentMap: Record<string, Component> = {
    board: Board,
  }
  const currentComponent = computed(() => (activeComponent.value ? componentMap[activeComponent.value.type] : null))

  onMounted(async () => {
    if (!projectStore.userProjects.length) {
      await projectStore.loadProjects()
    }
  })
</script>
