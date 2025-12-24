<template>
  <div class="kanban-column">
    <h2>{{ props.content.columnName }}</h2>
    <ul class="kanban-column__cards">
      <li v-for="card in kanbanCards" :key="card.id">
        <KanbanCard :id="card.id" :content="card" @remove="removeCardEvent" />
      </li>
    </ul>
    <button class="kanban-column__button" @click="addCardEvent()">
      <q-icon name="add" />
      Add Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import KanbanCard from 'components/kanban/KanbanCard.vue';
  import type { KanbanColumnType, KanbanCardType } from 'src/types/boardType';

  const props = defineProps<{
    content: KanbanColumnType;
  }>();
  const kanbanCards = ref<KanbanCardType[]>(props.content.cards);

  const addCardEvent = () => {
    const newId = Date.now() + Math.random();
    kanbanCards.value.push({ id: newId, taskName: 'New Task' });
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
