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
      Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Component } from 'vue';
  import KanbanCard from 'components/kanban/KanbanCard.vue';

  const kanbanCards = ref<Component[]>([KanbanCard]);

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
  }
</style>
