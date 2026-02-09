<template>
  <ModalWindow>
    <BoardModal />
  </ModalWindow>

  <q-page class="page page--board">
    <h1 class="headline">{{ boardStore.projectName }}</h1>
    <ul class="board">
      <li class="board__columnWrapper" v-for="column in boardStore.columns" :key="column.id">
        <BoardColumn :columnContent="column" />
      </li>
      <li class="board__columnWrapper">
        <button class="board__button board__button--add-column" @click="addColumn()">
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
  import { useDragScroll } from 'src/composables/useDragScroll';

  import BoardModal from 'src/components/board/BoardModal.vue';
  import BoardColumn from 'src/components/board/BoardColumn.vue';
  import { addColumn } from 'src/services/boardColumnService';

  const boardStore = useBoardStore();
  useDragScroll('main');

  onMounted(() => {
    void boardStore.initData();
  });
</script>

<style lang="scss" scoped>
  .page--board {
    padding: 2em 0;
    overflow-x: auto;

    .headline {
      padding: 0 1em;
    }

    .board {
      display: flex;
      gap: 2em;
      min-width: min-content;
      margin: 0 2em;

      &__columnWrapper {
        width: 20em;
      }

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
  }
</style>
