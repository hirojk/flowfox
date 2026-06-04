<template>
  <ModalUI>
    <BoardModal v-if="appStore.modalContent === 'board-card'" />
    <BoardSetting v-if="appStore.modalContent === 'board-setting'" />
  </ModalUI>

  <q-page class="page--board" v-bind="$attrs">
    <div class="page__headerWrapper">
      <header class="page__header">
        <div class="page__headerContent">
          <InitialUI
            :size="+5"
            :icon="'icon-board'"
            :color="colors['pw-black']"
            :backgroundColor="colors['pw-quaternary']"
          />
          <TextEditor
            class="page__headline"
            htmlTag="h1"
            textStyle="h2"
            :text="boardStore.activeBoard?.name || ''"
            :saveEvent="(newBoardName) => boardStore.updateBoardName(boardStore.activeBoard?.id!, newBoardName)"
          />
        </div>
        <IconButtonUI class="page__project-setting" icon="icon-custom" @click="openSettingsModal('board-setting')" />
      </header>
    </div>
    <section class="page__content">
      <ul ref="boardRef" class="board" aria-label="Board columns">
        <li
          v-for="column in boardStore.activeBoard?.columns"
          :key="column.id"
          class="board__columnWrapper draggable"
          :data-id="column.id"
        >
          <BoardColumn :columnContent="column" />
        </li>
        <li class="board__columnWrapper">
          <ButtonUI
            class="board__button"
            variant="board"
            icon="icon-plus"
            label="Add column"
            @click="handleAddColumn"
          />
        </li>
      </ul>
    </section>
  </q-page>
</template>

<script setup lang="ts">
  import colors from '@styles/colors.json'

  import { ref, watch } from 'vue'
  import BoardColumn from '@components/board/BoardColumn.vue'
  import BoardModal from '@components/board/BoardModal.vue'
  import BoardSetting from '@components/board/BoardSetting.vue'
  import InitialUI from '@components/ui/InitialUI.vue'
  import TextEditor from '@components/ui/TextEditor.vue'
  import IconButtonUI from '@components/ui/IconButtonUI.vue'

  import { triggerInputFocus } from '@composables/useIosInteractions'
  import { useBoardColumn } from '@composables/useBoard'
  import { openSettingsModal } from '@composables/useModal'
  import { useGrabElement, useDragScroll } from '@composables/useMouseInteractions'
  import { useComponentResolver } from '@composables/useNavigation'
  import { useAppStore } from '@stores/appStore'
  import { useBoardStore } from '@stores/boardStore'

  const appStore = useAppStore()
  const { addColumn } = useBoardColumn()
  const boardStore = useBoardStore()

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

  const handleAddColumn = () => {
    triggerInputFocus(async () => {
      const newColumn = addColumn()
      if (newColumn) appStore.currentEditingId = newColumn.id
    }, '.board__columnWrapper:nth-last-child(2) input')
  }

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
      }

      &__header {
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
        width: 100%;
      }
    }
  }
</style>
