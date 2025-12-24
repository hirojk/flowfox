<template>
  <q-page padding class="page">
    <h1 class="headline">{{ boardStore.projectName }}</h1>
    <ul class="kanban">
      <li
        class="kanban__column"
        v-for="column in boardStore.columns"
        :key="column.id"
      >
        <KanbanColumn :content="column" />
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';
  import KanbanColumn from 'components/kanban/KanbanColumn.vue';

  const boardStore = useBoardStore();

  onMounted(() => {
    void boardStore.initData();
  });
</script>

<style lang="scss" scoped>
  .kanban {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
</style>
