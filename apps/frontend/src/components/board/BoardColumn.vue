<template>
  <section :id="`board-column-${props.columnContent.id}`" class="board-column">
    <div class="board-column__header">
      <InputFieldUI
        editMode
        htmlTag="h2"
        textStyle="body"
        borderColor="secondary"
        backgroundColor="secondary"
        :text="props.columnContent.name"
        :saveEvent="(newColumnName) => renameColumn(props.columnContent.id, newColumnName)"
        :cancelEvent="() => removeColumn(props.columnContent.id)"
      />
      <IconButtonUI
        class="page__project-setting"
        icon="icon-menu"
        borderColor="tertiary"
        :size="2"
        :dropdown="[
          {
            name: 'Remove column',
            action: () => removeColumn(props.columnContent.id),
          },
        ]"
      />
    </div>
    <ul class="board-column__cards">
      <li v-for="card in boardCards" :key="Array.isArray(card.id) ? card.id[1] : card.id">
        <BoardCard :columnId="props.columnContent.id" :cardContent="card" />
      </li>
    </ul>
    <ButtonUI class="board-column__button" variant="board" icon="icon-plus" label="Add card" @click="handleAddCard" />
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import BoardCard from '@components/board/BoardCard.vue'
  import IconButtonUI from '@components/ui/IconButtonUI.vue'
  import InputFieldUI from '@components/ui/InputFieldUI.vue'

  import { useBoardColumn, useBoardCard } from '@composables/useBoard'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import { useAppStore } from '@stores/appStore'
  import type { BoardColumnType } from '@pagewise/shared'

  const props = defineProps<{
    columnContent: BoardColumnType
  }>()

  const appStore = useAppStore()
  const { removeColumn, renameColumn } = useBoardColumn()
  const { addCard } = useBoardCard()

  const boardCards = computed(() => props.columnContent.cards)

  const handleAddCard = () => {
    triggerInputFocus(async () => {
      const newCard = addCard(props.columnContent.cards)
      if (newCard) appStore.currentEditingId = newCard.id
    }, `#board-column-${props.columnContent.id} .board-column__cards li:last-child input`)
  }
</script>

<style lang="scss" scoped>
  .board-column {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    width: 100%;
    border-radius: 1em;
    padding: 1.5em;
    background-color: $color-semantic-theme-page-orange-background-primary;
    cursor: grab;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 2em;
    }

    &__cards {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 0 1em;
    }

    &:active {
      cursor: grabbing;
    }
  }
</style>
