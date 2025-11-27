<template>
  <q-drawer show-if-above v-model="drawerIsOpen" :width="250" class="sideBar">
    <q-list>
      <q-item
        clickable
        v-for="item in navItems"
        :key="item.label"
        @click="handleNavItemClick(item)"
      >
        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const drawerIsOpen = ref(true);

  interface NavItem {
    label: string;
    route?: string;
    action?: () => void;
  }

  const navItems: NavItem[] = [
    { label: 'Board', route: '/' },
    { label: 'Account', route: '/' },
    { label: 'Settings', route: '/settings' },
    { label: 'Close', action: () => (drawerIsOpen.value = false) },
  ];

  function handleNavItemClick(item: NavItem) {
    if (item.action) {
      item.action();
    } else {
      console.log('Navigate to', item.route);
    }
  }
</script>

<style lang="scss">
  .sideBar {
    background-color: aqua;
  }
</style>
