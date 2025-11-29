<template>
  <q-page padding class="page">
    <h1>Board Page</h1>
    <div class="kanban">
      <KanbanColumn />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import KanbanColumn from 'components/kanban/KanbanColumn.vue';
</script>

<style lang="scss" scoped>
  .kanban {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
</style>
