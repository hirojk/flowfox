<template>
  <div class="kanban-column">
    <h2>Kanban Column</h2>
    <div class="kanban-column__cards">
      <KanbanCard
        v-for="card in kanbanCards"
        :key="card.id"
        :id="card.id"
        @remove="removeCardEvent"
      />
    </div>
    <button class="kanban-column__button" @click="addCardEvent()">
      <q-icon name="add" />
      Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import KanbanCard from 'components/kanban/KanbanCard.vue';

  interface Card {
    id: number;
  }

  const kanbanCards = ref<Card[]>([]);

  const addCardEvent = () => {
    const newId = Date.now() + Math.random();
    kanbanCards.value.push({ id: newId });
  };

  const removeCardEvent = (id: number) => {
    kanbanCards.value = kanbanCards.value.filter((card) => card.id !== id);
  };
</script>

<style lang="scss" scoped>
  .kanban-column {
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
