<template>
  <section :id="`board-column-${props.columnContent.id}`" class="board-column">
    <div class="board-column__header">
      <TextEditor
        editMode
        htmlTag="h2"
        textStyle="h3"
        :text="props.columnContent.name"
        :saveEvent="(newColumnName) => renameColumn(props.columnContent.id, newColumnName)"
        :cancelEvent="() => removeColumn(props.columnContent.id)"
      />
      <DropdownMenu
        mode="context"
        icon="icon-menu"
        :options="[
          {
            name: 'Remove Column',
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
    <button class="board-column__button" @click="handleAddCard">
      <IconSvg id="icon-plus" />
      Add Card
    </button>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import BoardCard from '@components/board/BoardCard.vue'
  import { useBoardColumn, useBoardCard } from '@composables/useBoard'
  import { triggerInputFocus } from '@composables/useIosInteractions'
  import { useAppStore } from '@stores/appStore'
  import type { BoardColumnType } from '@flowfox/shared'

  import TextEditor from '@components/fields/TextEditor.vue'

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
    background-color: $ff-quinary;
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
