<template>
  <section class="board-column">
    <h2>{{ props.columnContent.columnName }}</h2>
    <ul class="board-column__cards">
      <li v-for="card in boardCards" :key="card.id">
        <BoardCard
          :id="card.id"
          :columnId="props.columnContent.id"
          :cardContent="card"
          @remove="removeCardEvent(boardCards, card.id)"
        />
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
  import type { BoardColumnType, BoardCardType } from 'src/types/boardType';

  import BoardCard from 'components/board/BoardCard.vue';
  import { addCardEvent, removeCardEvent } from 'src/composables/useBoardCard';

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
