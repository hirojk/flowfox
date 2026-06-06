<template>
  <Teleport defer to="#modal-header">
    <h1 class="h3">Board Custom Setting</h1>
  </Teleport>
  <section class="modal__category">
    <h2 class="modal__category-headline h4">Customization</h2>
    <div class="modal__category-content modal__category-content--grid">
      <div class="board-setting__content board-setting__content--card">
        <div class="modal__category-textWrapper">
          <h3 class="modal__category-text modal__category-text--strong">Board Display Settings</h3>
          <p class="modal__category-text">
            Choose which elements should be visible and marked as important in your board.
          </p>
        </div>
        <div class="board-setting__chechboxWrapper">
          <label
            v-for="(value, key) in boardStore.activeBoard?.settings.modal"
            :key="key"
            class="board-setting__checkbox"
          >
            <input
              type="checkbox"
              :checked="value"
              class="board-setting__box checkbox"
              @change="updateSetting('modal', key, ($event.target as HTMLInputElement).checked)"
            />
            Show {{ key }}
          </label>
        </div>
      </div>
      <div class="board-setting__content board-setting__content--modal">
        <div class="modal__category-textWrapper">
          <h3 class="modal__category-text modal__category-text--strong">Card Display Options</h3>
          <p class="modal__category-text">Choose which details appear on each card and highlight what matters most.</p>
        </div>
        <div class="board-setting__chechboxWrapper">
          <label
            v-for="(value, key) in boardStore.activeBoard?.settings.cards"
            :key="key"
            class="board-setting__checkbox"
          >
            <input
              type="checkbox"
              :checked="value"
              :disabled="!boardStore.activeBoard?.settings.modal[key]"
              class="board-setting__box checkbox"
              @change="updateSetting('cards', key, ($event.target as HTMLInputElement).checked)"
            />
            Enable {{ key }}
          </label>
        </div>
      </div>
    </div>
  </section>
  <Teleport defer to="#modal-footer">
    <section class="project-setting__dangerzone modal__category modal__category--dangerzone">
      <h2 class="modal__category-headline h4">Danger Zone</h2>
      <div class="modal__category-content">
        <div class="modal__category-textWrapper">
          <h3 class="modal__category-text modal__category-text--strong">Delete board</h3>
          <p class="modal__category-text">Once you delete a board, there is no going back. Please be certain.</p>
        </div>
        <ButtonUI class="project-setting__delete" variant="error" label="Delete board" @click="onDeleteBoard" />
      </div>
    </section>
  </Teleport>
</template>

<script setup lang="ts">
  import { useDeletePrompt } from '@composables/usePromptWindow'
  import { useBoardStore } from '@stores/boardStore'
  import { useProjectStore } from '@stores/projectStore'
  import type { BoardSettingType } from '@pagewise/shared'

  const projectStore = useProjectStore()
  const boardStore = useBoardStore()

  const { open } = useDeletePrompt()

  const updateSetting = (section: keyof BoardSettingType, key: string, value: boolean) => {
    if (!boardStore.activeBoard) return

    boardStore.activeBoard.settings[section] = {
      ...boardStore.activeBoard.settings[section],
      [key]: value,
    }

    if (section === 'modal' && !value) {
      boardStore.activeBoard.settings.cards = {
        ...boardStore.activeBoard.settings.cards,
        [key]: false,
      }
    }

    boardStore.updateBoard(boardStore.activeBoard.id)
  }

  const onDeleteBoard = () => {
    if (!boardStore.activeBoard) return

    open(
      `Are you sure you want to delete the board "${boardStore.activeBoard?.name}"?`,
      () => boardStore.deleteBoard(boardStore.activeBoard!.id),
      {
        name: 'project',
        params: { projectId: String(projectStore.activeProject?.id) },
      },
    )
  }
</script>

<style lang="scss" scoped>
  .board-setting {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 1em;
      width: 100%;
    }

    &__chechboxWrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25em;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 1em;
      width: 100%;
      padding: 0.5em 0;
    }
  }
</style>
