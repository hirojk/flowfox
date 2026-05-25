<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view class="page page--main" />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
  .page--main {
    padding: $page-padding-y $page-padding-x;
    background-color: $pw-white;
  }
</style>
