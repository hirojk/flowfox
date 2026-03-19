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
      <SidebarItem buttonStyle="project" icon="icon-home" label="Test Project" />
      <hr class="sideBar__divider" />
      <SidebarItem v-for="item in componentItems" :key="item.label" v-bind="item" />
    </q-list>

    <q-list class="sideBar__list sideBar__list--nav">
      <SidebarItem v-for="item in navItems" :key="item.label" v-bind="item" />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SidebarItem from '@components/sidebar/sidebarItem.vue'

  const drawer = ref(true)
  const miniState = ref(true)

  const componentItems = [
    {
      buttonStyle: 'component' as const,
      icon: 'icon-plus',
      label: 'Pizza',
    },
  ]

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
</script>

<style lang="scss">
  .sideBar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: calc($page-padding-y - 1em) 0;
    background-color: $ff-white;

    &__divider {
      margin: 1em;
    }
  }
</style>
