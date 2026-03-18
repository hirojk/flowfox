<template>
  <q-layout view="lHh Lpr lFf">
    <SideBar />

    <q-page-container>
      <router-view class="page page--component" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import SideBar from '@components/SideBar.vue'
</script>

<style lang="scss">
  .page--component {
    background-color: $ff-tertiary;
  }
</style>
