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
        theme="orange"
        :headline="projectStore.activeProject?.name || ''"
        :route="{ name: 'project', params: { projectId: String(activeProject?.id) } }"
      />
      <SidebarItem
        v-for="(item, index) in projectStore.activeProject?.components"
        :key="item.name"
        :index="index"
        buttonStyle="page"
        theme="orange"
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
    </q-list>

    <q-list class="sideBar__list sideBar__list--nav">
      <SidebarItem v-for="item in navItems" :key="item.headline" v-bind="item" buttonStyle="neutral" theme="orange" />
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

  const sidebarWidth = 275
  const sidebarMiniWidth = 100
  const sidebarPadding = 3

  const appStore = useAppStore()
  const projectStore = useProjectStore()
  const { activeProject } = useComponentResolver()

  const navItems = computed(() => [
    {
      icon: 'icon-home',
      headline: 'Back to Overview',
      route: { name: 'home' },
      action: (): boolean => (appStore.isSidebarOpen = false),
    },
    {
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
    background-color: $color-semantic-surface-cold;
    box-shadow: inset -2em 0 5em rgba($color-semantic-box-shadow, 0.25);
  }
</style>
