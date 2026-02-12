<template>
  <ModalWindow>
    <BoardModal />
  </ModalWindow>

  <q-page class="page page--board">
    <div class="page__headerWrapper">
      <div class="page__header">
        <TextEditor
          class="headline"
          htmlTag="h1"
          :text="boardStore.projectName"
          :saveEvent="(newProjectName) => boardStore.updateProjektName(newProjectName)"
        />
        <button>Placeholder Button</button>
      </div>
    </div>
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
  import { onMounted } from 'vue'
  import { useBoardStore } from '@stores/boardStore.ts'
  import { useDragScroll } from '@composables/useDragScroll.ts'

  import BoardModal from '@components/board/BoardModal.vue'
  import TextEditor from '@components/fields/TextEditor.vue'
  import BoardColumn from '@components/board/BoardColumn.vue'
  import { addColumn } from '@services/boardColumnService.ts'

  const boardStore = useBoardStore()

  useDragScroll('main')

  onMounted(() => {
    void boardStore.initData()
  })
</script>

<style lang="scss" scoped>
  .page--board {
    padding: 2em 0;
    overflow-x: auto;

    .page {
      &__headerWrapper {
        position: sticky;
        left: 0;
        margin-bottom: 2em;
      }

      &__header {
        display: flex;
        justify-content: space-between;
        padding: 0 2em;
      }
    }

    .board {
      display: flex;
      gap: 2em;
      min-width: min-content;
      margin: 0 2em;

      &__columnWrapper {
        width: 20em;
        flex-shrink: 0;
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
