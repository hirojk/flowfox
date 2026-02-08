<template>
  <section class="board-column">
    <div class="board-column__header">
      <EditableText
        htmlTag="h2"
        :text="props.columnContent.columnName"
        :saveEvent="(newColumnName) => renameColumn(props.columnContent.id, newColumnName)"
      />
      <ContextMenu
        :events="[
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
  import { computed } from 'vue';
  import BoardCard from 'src/components/board/BoardCard.vue';
  import type { BoardColumnType } from 'src/types/boardType';
  import { removeColumn, renameColumn } from 'src/services/boardColumnService';
  import { addCard } from 'src/services/boardCardService';

  import EditableText from 'src/components/fields/TextEditor.vue';

  const props = defineProps<{
    columnContent: BoardColumnType;
  }>();
  const boardCards = computed(() => props.columnContent.cards);
</script>

<style lang="scss" scoped>
  .board-column {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    border-radius: 1em;
    padding: 1em;
    background-color: $quaternary;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__cards {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 0 1em;
    }
  }
</style>
