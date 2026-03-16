<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    mini-to-overlay
    :width="200"
    :breakpoint="500"
    class="sideBar"
  >
    <q-list class="sideBar__list" v-for="(list, index) in [navItems, settingsItems]" :key="index">
      <q-item
        class="sideBar__item"
        clickable
        v-ripple
        v-for="item in list"
        :key="item.label"
        :to="item.route"
        @click="item.action"
      >
        <q-item-section avatar>
          <iconSvg id="icon-plus" />
        </q-item-section>
        <q-item-section>
          {{ item.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(true)
  const miniState = ref(true)

  interface NavItem {
    label: string
    icon: string
    route?: { name: string }
    action?: () => void
  }

  const navItems: NavItem[] = [
    {
      label: 'Home',
      icon: 'home',
      route: { name: 'home' },
    },
  ]

  const settingsItems: NavItem[] = [
    {
      label: 'Account',
      icon: 'person',
      route: { name: 'home' },
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: { name: 'home' },
    },
    {
      label: 'Close',
      icon: 'last_page',
      action: () => (miniState.value = !miniState.value),
    },
  ]
</script>

<style lang="scss">
  .sideBar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 0;
    background-color: $ff-white;

    &__item {
      font-size: nth(map-get($font-size, md), 1);
    }
  }
</style>
