<template>
  <q-page padding class="page">
    <h1 class="headline">{{ boardStore.projectName }}</h1>
    <ul class="board">
      <li
        class="board__column"
        v-for="column in boardStore.columns"
        :key="column.id"
      >
        <BoardColumn :columnContent="column" />
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';
  import BoardColumn from 'components/board/BoardColumn.vue';

  const boardStore = useBoardStore();

  onMounted(() => {
    void boardStore.initData();
  });
</script>

<style lang="scss" scoped>
  .board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
</style>
