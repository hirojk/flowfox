<template>
  <component :is="currentComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
  import { onMounted, computed, type Component } from 'vue'
  import { useComponentResolver } from '@composables/useNavigation'
  import Board from '@pages/BoardPage.vue'
  import { useProjectStore } from '@stores/projectStore'

  const projectStore = useProjectStore()
  const { activeComponent } = useComponentResolver()

  const componentMap: Record<string, Component> = {
    board: Board,
  }
  const currentComponent = computed(() => (activeComponent.value ? componentMap[activeComponent.value.type] : null))
  defineOptions({ inheritAttrs: false })

  onMounted(async () => {
    if (!projectStore.allProjects.length) {
      await projectStore.loadProjects()
    }
  })
</script>
