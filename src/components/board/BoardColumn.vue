<template>
  <section class="board-column">
    <div class="board-column__header">
      <h2>{{ props.columnContent.columnName }}</h2>
      <ContextMenu
        :events="[
          { name: 'Rename', action: () => {} },
          { name: 'Remove', action: () => removeColumnEvent(props.columnContent.id) },
        ]"
      />
    </div>
    <ul class="board-column__cards">
      <li v-for="card in boardCards" :key="card.id">
        <BoardCard :id="card.id" :columnId="props.columnContent.id" :cardContent="card" />
      </li>
    </ul>
    <button class="board-column__button" @click="addCardEvent(boardCards)">
      <IconSvg id="icon-plus" />
      Add Card
    </button>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BoardCard from 'components/board/BoardCard.vue';
  import type { BoardColumnType, BoardCardType } from 'src/types/boardType';
  import { removeColumnEvent } from 'src/composables/useBoardColumn';
  import { addCardEvent } from 'src/composables/useBoardCard';

  const props = defineProps<{
    columnContent: BoardColumnType;
  }>();
  const boardCards = ref<BoardCardType[]>(props.columnContent.cards);
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
