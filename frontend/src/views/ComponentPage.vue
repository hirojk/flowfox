<template>
  <component :is="currentComponent" v-bind="$attrs" />
  <div v-if="appStore.isSidebarOpen" class="page__backdrop" @click="appStore.isSidebarOpen = false"></div>
</template>

<script setup lang="ts">
  import { onMounted, computed, type Component } from 'vue'
  import { useAppStore } from '@stores/appStore'
  import { useComponentResolver } from '@composables/useNavigation'
  import Board from '@components/board/BoardPage.vue'
  import { useProjectStore } from '@stores/homeStore.ts'

  const appStore = useAppStore()
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
