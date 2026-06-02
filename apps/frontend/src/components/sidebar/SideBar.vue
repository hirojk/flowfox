<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!appStore.isSidebarOpen"
    :width="sidebarWidth"
    :mini-width="sidebarMiniWidth"
    :breakpoint="750"
    class="sideBar"
    :style="{ '--sidebar-mini-width': sidebarMiniWidth + 'px', '--sidebar-padding': sidebarPadding + 'em' }"
  >
    <q-list class="sideBar__list sideBar__list--project">
      <SidebarItem
        buttonStyle="project"
        :headline="projectStore.activeProject?.name || ''"
        :route="{ name: 'project', params: { projectId: String(activeProject?.id) } }"
      />
      <SidebarItem
        v-for="(item, index) in projectStore.activeProject?.components"
        :key="item.name"
        :index="index"
        buttonStyle="component"
        :icon="`icon-${item.type}`"
        :headline="item.name"
        :subline="item.type"
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
      <SidebarItem v-for="item in navItems" :key="item.headline" v-bind="item" />
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
      buttonStyle: 'neutral' as const,
      icon: 'icon-home',
      headline: 'Back to Overview',
      route: { name: 'home' },
      action: (): boolean => (appStore.isSidebarOpen = false),
    },
    {
      buttonStyle: 'neutral' as const,
      icon: appStore.isSidebarOpen ? 'icon-collapse' : 'icon-expand',
      headline: appStore.isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar',
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
    background-color: $pw-lightgrey;
    box-shadow: inset -2em 0 5em rgba($pw-black, 0.25);
  }
</style>
