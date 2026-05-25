<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!appStore.isSidebarOpen"
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
        :label="projectStore.activeProject?.name || ''"
        :route="{ name: 'project', params: { projectId: String(activeProject?.id) } }"
      />
      <hr class="sideBar__divider" />
      <SidebarItem
        v-for="item in projectStore.activeProject?.components"
        :key="item.name"
        buttonStyle="component"
        :icon="`icon-${item.type}`"
        :label="item.name"
        :route="{
          name: 'component',
          params: {
            projectId: String(activeProject?.id),
            componentId: String(item.id),
          },
        }"
      />
      <!-- <SidebarItem buttonStyle="new" icon="icon-plus" label="New Component" /> -->
    </q-list>

    <q-list class="sideBar__list sideBar__list--nav">
      <SidebarItem v-for="item in navItems" :key="item.label" v-bind="item" />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import SidebarItem from '@components/sidebar/SideBarItem.vue'

  import { useComponentResolver } from '@composables/useNavigation'
  import { useAppStore } from '@stores/appStore'
  import { useProjectStore } from '@stores/projectStore'

  const drawer = ref(true)

  const sidebarWidth = 300
  const sidebarMiniWidth = 100
  const sidebarPadding = 3

  const appStore = useAppStore()
  const projectStore = useProjectStore()
  const { activeProject } = useComponentResolver()

  const navItems = computed(() => [
    {
      buttonStyle: 'nav' as const,
      icon: 'icon-home',
      label: 'Back to all projects',
      route: { name: 'home' },
      action: (): boolean => (appStore.isSidebarOpen = false),
    },
    {
      buttonStyle: 'nav' as const,
      icon: appStore.isSidebarOpen ? 'icon-collapse' : 'icon-expand',
      label: appStore.isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar',
      action: (): boolean => (appStore.isSidebarOpen = !appStore.isSidebarOpen),
    },
  ])

  watch(
    () => activeProject.value?.id,
    async (projectId) => {
      if (!projectId) return
      await projectStore.updateProject(projectId)
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
    background-color: $pw-white;

    &__divider {
      margin: 2em calc(var(--sidebar-padding) - 1em);
    }
  }
</style>
