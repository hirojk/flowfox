<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    mini-to-overlay
    :width="sidebarWidth"
    :mini-width="sidebarMiniWidth"
    :breakpoint="750"
    class="sideBar"
    :style="{ '--sidebar-mini-width': sidebarMiniWidth + 'px', '--sidebar-padding': sidebarPadding + 'em' }"
  >
    <q-list class="sideBar__list sideBar__list--project">
      <SidebarItem
        buttonStyle="project"
        :label="projectStore.activeProject?.projectName || ''"
        :editorEvent="(newProjectName) => projectStore.updateProjectName(newProjectName)"
      />
      <hr class="sideBar__divider" />
      <SidebarItem
        v-for="item in projectStore.activeProject?.components"
        :key="item.boardName"
        buttonStyle="component"
        :icon="`icon-${item.type}`"
        :label="item.boardName"
        :route="{
          name: 'component',
          params: {
            projectId: String(activeProject?.id),
            componentId: String(item.id),
          },
        }"
      />
      <SidebarItem buttonStyle="new" icon="icon-plus" label="New Component" />
    </q-list>

    <q-list class="sideBar__list sideBar__list--nav">
      <SidebarItem v-for="item in navItems" :key="item.label" v-bind="item" />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import SidebarItem from '@components/sidebar/SideBarItem.vue'

  import { useComponentResolver } from '@composables/useNavigation.ts'
  import { useProjectStore } from '@stores/homeStore'

  const drawer = ref(true)
  const miniState = ref(true)

  const sidebarWidth = 300
  const sidebarMiniWidth = 100
  const sidebarPadding = 3

  const projectStore = useProjectStore()
  const { activeProject } = useComponentResolver()

  const navItems = computed(() => [
    {
      buttonStyle: 'nav' as const,
      icon: 'icon-home',
      label: 'Back to all projects',
      route: { name: 'home' },
    },
    {
      buttonStyle: 'nav' as const,
      icon: miniState.value ? 'icon-expand' : 'icon-collapse',
      label: miniState.value ? 'Expand' : 'Collapse',
      action: () => (miniState.value = !miniState.value),
    },
  ])

  watch(
    () => activeProject.value?.id,
    async (projectId) => {
      if (!projectId) return
      await projectStore.updateActiveProject(projectId)
    },
    { immediate: true },
  )
</script>

<style lang="scss">
  .sideBar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: $page-padding-y 0;
    background-color: $ff-white;

    &__divider {
      margin: 1em calc(var(--sidebar-padding) - 1em);
    }
  }
</style>
