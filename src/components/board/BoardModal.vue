<template>
  <div class="board-modal__scrollContent">
    <div class="board-modal__header">
      <strong class="board-modal__header-headline">
        {{ activeCard?.taskName }}
      </strong>
      <div class="board-modal__header-priority">
        <!-- <q-select
          v-model="priorityModal"
          :options="priorityOptions"
          label="Priority"
          style="width: 200px"
        /> -->
        {{ activeCard?.priority }}
      </div>
    </div>
    <div class="board-modal__details">
      <div class="board-modal__content board-modal__content--description">
        <strong>Description</strong>
        <div class="board-modal__description">
          <slot name="description">{{ activeCard?.description }}</slot>
        </div>
      </div>
      <div class="board-modal__content board-modal__content--checklist">
        <strong>Checklist</strong>
        <ul class="board-modal__checklist">
          <li
            class="board-modal__checklist-item"
            v-for="subtask in activeCard?.checklist"
            :key="subtask.label"
          >
            <q-checkbox
              v-model="subtask.completed"
              :label="subtask.label"
              dense
            />
          </li>
        </ul>
      </div>
      <div class="board-modal__content board-modal__content--date">
        <div class="board-modal__date board-modal__date--start">
          <strong>Start Date</strong>
          {{ startDate.toDateString() }}
        </div>
        <div class="board-modal__date board-modal__date--deadline">
          <strong>Deadline</strong>
          {{ deadline.toDateString() }}
        </div>
      </div>
      <div class="board-modal__content board-modal__content--tag">
        <strong>Tags</strong>
        <ul class="board-modal__tags">
          <li
            class="board-modal__tags-item"
            v-for="tag in activeCard?.tags"
            :key="tag.label"
          >
            <span class="tag" :style="{ backgroundColor: tag.color }">
              {{ tag.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div class="board-modal__settings">
    <button class="board-modal__button board-modal__button--copy">
      <q-icon name="content_copy" />
      Copy Card
    </button>
  </div> -->
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';
  import type { BoardCardType } from 'src/types/boardType';

  const boardStore = useBoardStore();

  const activeCard = ref<BoardCardType | null>(null);

  // const priorityOptions = [
  //   { label: 'High', value: 'high' },
  //   { label: 'Medium', value: 'medium' },
  //   { label: 'Low', value: 'low' },
  // ];

  // const priorityModal = ref(activeCard.value?.priority);
  const startDate = ref<Date>(new Date());
  const deadline = ref<Date>(new Date());

  onMounted(() => {
    boardStore.columns.forEach((column) => {
      if (column.id !== boardStore.activeCardId[0]) return;

      column.cards.forEach((card) => {
        if (card.id === boardStore.activeCardId[1]) {
          console.log('Found active card:', card);
          activeCard.value = card;

          startDate.value = card.startDate;
          deadline.value = card.deadline;
        }
      });
    });
  });
</script>

<style lang="scss" scoped>
  .board-modal {
    &__scrollContent {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;

      &-headline {
        @include fontMixin(1.6rem, 2rem);

        width: 100%;
      }
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: 2em;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      &--date {
        flex-direction: row;
        justify-content: space-between;
        gap: 1em;
      }
    }

    &__description {
      min-height: 4lh;
    }

    &__checklist {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      &-item {
        width: 100%;
        padding: 0.5em 0;
      }
    }

    &__date {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      width: 100%;
    }

    &__tags {
      display: flex;
      gap: 0.5em;
      flex-wrap: wrap;
    }

    &__settings {
      display: flex;
      justify-content: space-between;
      gap: 1em;
    }

    &__button {
      display: flex;
      align-items: center;
      gap: 0.25em;

      &--copy,
      &--delete {
        width: 100%;
        justify-content: center;
        border-radius: 1em;
        padding: 1em 2em;
        background-color: rgb(199, 199, 199);
      }
    }
  }
</style>
