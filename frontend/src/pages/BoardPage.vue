<template>
  <ModalWindow>
    <BoardModal v-if="appStore.modalContent === 'board-card'" />
    <BoardSetting v-if="appStore.modalContent === 'board-setting'" />
  </ModalWindow>

  <q-page class="page--board" v-bind="$attrs">
    <div class="page__headerWrapper">
      <header class="page__header">
        <div class="page__headerContent">
          <iconSvg id="icon-board" class="page__headerIcon" buttonStyle="project" size="56" />
          <TextEditor
            class="page__headline"
            htmlTag="h1"
            :text="boardStore.activeBoard?.name || ''"
            :saveEvent="(newBoardName) => boardStore.updateBoardName(boardStore.activeBoard?.id!, newBoardName)"
          />
        </div>
        <button class="button button--primary" @click="openSettingsModal('board-setting')">Setting</button>
      </header>
    </div>
    <section class="page__content">
      <ul ref="boardRef" class="board">
        <li
          v-for="column in boardStore.activeBoard?.columns"
          :key="column.id"
          class="board__columnWrapper draggable"
          :data-id="column.id"
        >
          <BoardColumn :columnContent="column" />
        </li>
        <li class="board__columnWrapper">
          <button class="board__button board__button--add-column" @click="addColumn()">
            <IconSvg id="icon-plus" />
            Add Column
          </button>
        </li>
      </ul>
    </section>
  </q-page>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BoardColumn from '@components/board/BoardColumn.vue'
  import BoardModal from '@components/board/BoardModal.vue'
  import BoardSetting from '@components/board/BoardSetting.vue'
  import TextEditor from '@components/fields/TextEditor.vue'
  import { addColumn } from '@composables/useBoardColumn'
  import { openSettingsModal } from '@composables/useModal'
  import { useGrabElement, useDragScroll } from '@composables/useMouseInteractions'
  import { useComponentResolver } from '@composables/useNavigation'
  import { useAppStore } from '@stores/appStore'
  import { useBoardStore } from '@stores/boardStore'

  const boardStore = useBoardStore()
  const appStore = useAppStore()

  const { activeProject, activeComponent } = useComponentResolver()
  const boardRef = ref<HTMLElement | null>(null)

  defineOptions({ inheritAttrs: false })
  useDragScroll()
  useGrabElement(boardRef, (newOrder: number[]) => {
    if (!boardStore.activeBoard) return

    boardStore.activeBoard.columns = newOrder.map(
      (id) => boardStore.activeBoard!.columns.find((column) => column.id === id)!,
    )
    boardStore.updateBoard(boardStore.activeBoard.id)
  })

  watch(
    () => [activeProject.value?.id, activeComponent.value?.id],
    async ([projectId, boardId]) => {
      if (!projectId || !boardId) return
      try {
        await boardStore.loadBoard(projectId, boardId)
      } catch (error) {
        console.error('Error loading board:', error)
      }
    },
    { immediate: true },
  )
</script>

<style lang="scss" scoped>
  .page--board {
    padding: $page-padding-y 0;
    overflow-x: auto;

    .page {
      &__headerWrapper {
        position: sticky;
        left: 0;
        margin-bottom: 2em;
      }

      &__header {
        gap: 2em;
        padding: 0 $page-padding-x;
      }
    }

    .board {
      display: flex;
      gap: 2em;
      min-width: min-content;
      padding: 0 $page-padding-x;

      &__columnWrapper {
        flex-shrink: 0;
        width: 20em;
        height: fit-content;
      }

      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        border-radius: 1em;
        padding: 1em;
        background-color: $ff-quinary;
        color: $ff-black;
        font-size: list.nth(map.get($font-size, sm), 1);
      }
    }
  }
</style>
