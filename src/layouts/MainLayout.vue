<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import SideBar from 'components/SideBar.vue';
</script>
