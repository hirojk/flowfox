<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    mini-to-overlay
    :width="300"
    :mini-width="80"
    :breakpoint="750"
    class="sideBar"
  >
    <q-list class="sideBar__list sideBar__list--project">
      <SidebarItem buttonStyle="project" :label="projectStore.activeProject?.projectName || ''" />
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
  import { ref, watch } from 'vue'
  import SidebarItem from '@components/sidebar/SideBarItem.vue'

  import { useComponentResolver } from '@composables/useNavigation.ts'
  import { useProjectStore } from '@stores/homeStore'

  const drawer = ref(true)
  const miniState = ref(true)
  const projectStore = useProjectStore()

  const { activeProject } = useComponentResolver()

  const navItems = [
    {
      buttonStyle: 'nav' as const,
      icon: 'icon-close',
      label: 'Back to all projects',
      route: { name: 'home' },
    },
    {
      buttonStyle: 'nav' as const,
      icon: 'icon-close',
      label: 'Close',
      action: () => (miniState.value = !miniState.value),
    },
  ]

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
      margin: 1em;
    }
  }
</style>
