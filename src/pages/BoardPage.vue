<template>
  <ModalWindow>
    <BoardModal />
  </ModalWindow>

  <q-page padding class="page">
    <h1 class="headline">{{ boardStore.projectName }}</h1>
    <ul class="board">
      <li class="board__column" v-for="column in boardStore.columns" :key="column.id">
        <BoardColumn :columnContent="column" />
      </li>
      <li class="board__column">
        <button class="board__button board__button--add-column" @click="addColumnEvent(boardStore.columns)">
          <IconSvg id="icon-plus" />
          Add Column
        </button>
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';

  import ModalWindow from 'components/ModalWindow.vue';
  import BoardModal from 'components/board/BoardModal.vue';

  import BoardColumn from 'components/board/BoardColumn.vue';
  import { addColumnEvent } from 'src/composables/useBoardColumn';

  const boardStore = useBoardStore();

  onMounted(() => {
    void boardStore.initData();
  });
</script>

<style lang="scss" scoped>
  .board {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2em;
    width: 100%;

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      border-radius: 1em;
      padding: 1em;
      width: 100%;
      font-size: nth(map-get($font-size, md), 1);
      color: $white;
      background-color: $quinterany;
    }
  }
</style>
