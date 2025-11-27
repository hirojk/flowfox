<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <!-- Page Container für den Hauptcontent -->
    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import SideBar from 'components/SideBar.vue';
</script>
