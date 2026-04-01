<template>
  <section class="board-column">
    <div class="board-column__header">
      <EditableText
        htmlTag="h2"
        textStyle="h3"
        :text="props.columnContent.name"
        :saveEvent="(newColumnName) => renameColumn(props.columnContent.id, newColumnName)"
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
        <BoardCard :id="card.id" :columnId="props.columnContent.id" :cardContent="card" />
      </li>
    </ul>
    <button class="board-column__button" @click="addCard(boardCards)">
      <IconSvg id="icon-plus" />
      Add Card
    </button>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import BoardCard from '@components/board/BoardCard.vue'
  import { removeColumn, renameColumn } from '@composables/useBoardColumn'
  import { addCard } from '@composables/useBoardCard'
  import type { BoardColumnType } from '@flowfox/shared'

  import EditableText from '@components/fields/TextEditor.vue'

  const props = defineProps<{
    columnContent: BoardColumnType
  }>()

  const boardCards = computed(() => props.columnContent.cards)
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
