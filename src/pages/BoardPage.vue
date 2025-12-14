<template>
  <q-page padding class="page">
    <h1 class="headline">{{ boardStore.projectName }}</h1>
    <div class="kanban">
      <KanbanColumn />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import KanbanColumn from 'components/kanban/KanbanColumn.vue';
  import { useBoardStore } from 'stores/board';
  import { onMounted } from 'vue';

  const boardStore = useBoardStore();

  onMounted(() => {
    void boardStore.setProjectName();
  });
</script>

<style lang="scss" scoped>
  .kanban {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
</style>
