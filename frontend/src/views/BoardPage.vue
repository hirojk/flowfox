<template>
  <ModalWindow>
    <BoardModal v-if="modalStore.currentWindow === 'board-card'" />
    <BoardSetting v-if="modalStore.currentWindow === 'board-setting'" />
  </ModalWindow>

  <q-page class="page--board" v-bind="$attrs">
    <div class="page__headerWrapper">
      <header class="page__header">
        <div class="page__headerContent">
          <iconSvg class="page__headerIcon" buttonStyle="project" id="icon-board" size="56" />
          <TextEditor
            class="page__headline"
            htmlTag="h1"
            :text="boardStore.activeBoard?.name || ''"
            :saveEvent="(newBoardName) => boardStore.updateBoardName(newBoardName)"
          />
        </div>
        <button class="button button--primary" @click="openSettingsModal('board-setting')">Setting</button>
      </header>
    </div>
    <section class="page__content">
      <ul class="board">
        <li class="board__columnWrapper" v-for="column in boardStore.activeBoard?.columns" :key="column.id">
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
  import { watch } from 'vue'
  import { useBoardStore } from '@stores/boardStore.ts'
  import { useModalStore } from '@stores/appStore'
  import { useDragScroll } from '@composables/useDragScroll.ts'
  import { useComponentResolver } from '@composables/useNavigation.ts'

  import BoardModal from '@components/board/BoardModal.vue'
  import BoardSetting from '@components/board/BoardSetting.vue'
  import TextEditor from '@components/fields/TextEditor.vue'
  import BoardColumn from '@components/board/BoardColumn.vue'
  import { addColumn } from '@services/boardColumnService.ts'
  import { openSettingsModal } from '@composables/useModal'

  const boardStore = useBoardStore()
  const modalStore = useModalStore()

  const { activeProject, activeComponent } = useComponentResolver()

  defineOptions({ inheritAttrs: false })
  useDragScroll('main')

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
        padding: 0 $page-padding-x;
      }
    }

    .board {
      display: flex;
      gap: 2em;
      min-width: min-content;
      padding: 0 $page-padding-x;

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
        font-size: nth(map-get($font-size, sm), 1);
        color: $ff-black;
        background-color: $ff-quinary;
      }
    }
  }
</style>
