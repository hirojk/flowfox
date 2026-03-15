<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view class="page page--main" />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
  .page--main {
    padding: 2.5em 3.75em;
    background-color: $ff-white;
  }
</style>
