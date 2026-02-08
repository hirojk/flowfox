<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import SideBar from 'src/components/SideBar.vue';
</script>
