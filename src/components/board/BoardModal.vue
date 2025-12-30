<template>
  <div class="board-modal__scrollContent">
    <div class="board-modal__header">
      <strong class="board-modal__header-headline">Hallo</strong>
      <div class="board-modal__header-priority">
        <q-select
          v-model="priorityModal"
          :options="priorityOptions"
          label="Priority"
          style="width: 200px"
        />
      </div>
    </div>
    <div class="board-modal__details">
      <div
        class="board-modal__details-content board-modal__details-content--description"
      >
        <strong>Description</strong>
        <div class="board-modal__details-description">
          <slot name="description">No description provided.</slot>
        </div>
      </div>
      <div
        class="board-modal__details-content board-modal__details-content--checklist"
      >
        <strong>Checklist</strong>
        <ul class="board-modal__detials-checklist"></ul>
      </div>
      <div
        class="board-modal__details-content board-modal__details-content--date"
      >
        <div class="board-modal__details-date board-modal__details-date--start">
          <strong>Start Date</strong>
          <q-input filled v-model="startDate" label="Start Date" />
        </div>
        <div
          class="board-modal__details-date board-modal__details-date--deadline"
        >
          <strong>Deadline</strong>
          <q-input filled v-model="deadline" label="Deadline" />
        </div>
      </div>
      <div
        class="board-modal__details-content board-modal__details-content--tag"
      >
        <strong>Tags</strong>
        <q-input filled v-model="startDate" label="Tag" />
      </div>
    </div>
  </div>
  <div class="board-modal__settings">
    <button class="board-modal__button board-modal__button--copy">
      <q-icon name="content_copy" />
      Copy Card
    </button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';

  const boardStore = useBoardStore();

  const priorityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  const priorityModal = ref(null);
  const startDate = ref('');
  const deadline = ref('');

  onMounted(() => {
    console.log(boardStore.activeCardId);
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
      gap: 1em;

      &-content {
        display: flex;
        flex-direction: column;
        gap: 0.25em;

        &--date {
          flex-direction: row;
          justify-content: space-between;
          gap: 1em;
        }
      }

      &-description {
        min-height: 4lh;
      }

      &-date {
        width: 100%;
      }
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
