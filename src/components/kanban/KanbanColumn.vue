<template>
  <div class="kanban-column">
    <h2>Kanban Column</h2>
    <div class="kanban-cards">
      <KanbanCard />
    </div>
    <button class="kanban-button">Add Card</button>
  </div>
</template>

<script setup lang="ts">
  import KanbanCard from 'components/kanban/KanbanCard.vue';
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
  }
</style>
