<template>
  <div class="board-column">
    <h2>{{ props.columnContent.columnName }}</h2>
    <ul class="board-column__cards">
      <li v-for="card in boardCards" :key="card.id">
        <BoardCard
          :id="card.id"
          :cardContent="card"
          @remove="removeCardEvent"
        />
      </li>
    </ul>
    <button class="board-column__button" @click="addCardEvent()">
      <q-icon name="add" />
      Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BoardCard from 'components/board/BoardCard.vue';
  import type { BoardColumnType, BoardCardType } from 'src/types/boardType';

  const props = defineProps<{
    columnContent: BoardColumnType;
  }>();
  const boardCards = ref<BoardCardType[]>(props.columnContent.cards);

  const addCardEvent = () => {
    const newId = Date.now() + Math.random();
    boardCards.value.push({ id: newId, taskName: 'New Task' });
  };

  const removeCardEvent = (id: number) => {
    boardCards.value = boardCards.value.filter((card) => card.id !== id);
  };
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
