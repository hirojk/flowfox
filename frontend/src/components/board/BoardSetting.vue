<template>
  <section class="board-setting__header">
    <h2>Board Custom Setting</h2>
  </section>
  <section class="board-setting__details">
    <div class="board-setting__content board-setting__content--card">
      <strong class="board-setting__label">Cards Display</strong>
      <label v-for="(value, key) in boardStore.activeBoard?.settings.cards" :key="key" class="board-setting__checkbox">
        <input
          type="checkbox"
          :checked="value"
          :disabled="!boardStore.activeBoard?.settings.modal[key]"
          class="board-setting__box"
          @change="updateSetting('cards', key, ($event.target as HTMLInputElement).checked)"
        />
        {{ key }}
      </label>
    </div>
    <div class="board-setting__content board-setting__content--modal">
      <strong class="board-setting__label">Modal Display</strong>
      <label v-for="(value, key) in boardStore.activeBoard?.settings.modal" :key="key" class="board-setting__checkbox">
        <input
          type="checkbox"
          :checked="value"
          class="board-setting__box"
          @change="updateSetting('modal', key, ($event.target as HTMLInputElement).checked)"
        />
        {{ key }}
      </label>
    </div>
  </section>
  <Teleport defer to="#modal-footer">
    <button class="board-setting__delete button button--primary" @click="onDeleteBoard">
      <IconSvg id="icon-cancel" />
      Delete this Board
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@stores/homeStore'
  import { useBoardStore } from '@stores/boardStore'
  import { useDeletePrompt } from '@composables/usePrompt'
  import type { BoardSettingType } from '@flowfox/shared'

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
    open(
      `Are you sure you want to delete the board "${boardStore.activeBoard?.name}"?`,
      () => boardStore.deleteBoard(boardStore.activeBoard?.id!),
      {
        name: 'project',
        params: { projectId: String(projectStore.activeProject?.id) },
      },
    )
  }
</script>

<style lang="scss" scoped>
  .board-setting {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
      margin-bottom: 2em;

      &-headline {
        @include fontMixin(map-get($font-size, xl));
        width: 100%;
        cursor: text;
      }
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: 2em;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__label {
      @include fontMixin(map-get($font-size, md));
      font-weight: bold;
      margin-bottom: 0.5em;
    }

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 1em;
      width: 100%;
      padding: 0.5em 0;
    }

    &__box {
      width: 2em;
      height: auto;
      aspect-ratio: 1 / 1;
      accent-color: $ff-primary;
      cursor: pointer;
    }

    &__delete {
      width: 100%;
    }
  }
</style>
