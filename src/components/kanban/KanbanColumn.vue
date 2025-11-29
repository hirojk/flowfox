<template>
  <div class="kanban-column">
    <h2>Kanban Column</h2>
    <div class="kanban-column-cards">
      <KanbanCard
        v-for="(Card, index) in kanbanCards"
        :key="index"
        :is="Card"
      />
    </div>
    <button class="kanban-column-button" @click="addCardEvent()">
      <q-icon name="add" />
      Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Component } from 'vue';
  import KanbanCard from 'components/kanban/KanbanCard.vue';

  const kanbanCards = ref<Component[]>([]);

  const addCardEvent = () => {
    kanbanCards.value.push(KanbanCard);
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

    &-cards {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    &-button {
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 0 1em;
    }
  }
</style>
