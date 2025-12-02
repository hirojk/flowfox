<template>
  <div class="kanban-modal">
    <div class="kanban-modal__content">
      <div class="kanban-modal__interactives">
        <button
          class="kanban-modal__button kanban-modal__button--close"
          @click.stop="$emit('close')"
        >
          <q-icon name="close" />
          Close
        </button>
      </div>
      <div class="kanban-modal__header">
        <strong class="kanban-modal__header-headline">{{ headline }}</strong>
        <div class="kanban-modal__header-priority">
          <q-select
            v-model="priorityModal"
            :options="priorityOptions"
            label="Priority"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="kanban-modal__details">
        <div
          class="kanban-modal__details-content kanban-modal__details-content--description"
        >
          <strong>Description</strong>
          <div class="content">
            <slot name="description">No description provided.</slot>
          </div>
        </div>
        <div
          class="kanban-modal__details-content kanban-modal__details-content--checklist"
        >
          <strong>Checklist</strong>
          <ul></ul>
        </div>
        <div
          class="kanban-modal__details-content kanban-modal__details-content--date"
        >
          <div class="startDate">
            <strong>Start Date</strong>
            <q-input filled v-model="startDate" label="Start Date" />
          </div>
          <div class="deadline">
            <strong>Deadline</strong>
            <q-input filled v-model="deadline" label="Deadline" />
          </div>
        </div>
        <div
          class="kanban-modal__details-content kanban-modal__details-content--tag"
        >
          <strong>Tags</strong>
          <q-input filled v-model="startDate" label="Tag" />
        </div>
      </div>
      <div class="kanban-modal__footer">
        <button class="kanban-modal__button kanban-modal__button--copy">
          <q-icon name="content_copy" />
          Copy Card
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    headline: string;
    priority?: number;
  }>();

  const priorityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  const priorityModal = ref(null);
  const startDate = ref('');
  const deadline = ref('');
</script>

<style lang="scss" scoped>
  .kanban-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4em 4em 6em;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3001;

    &__content {
      width: 100%;
      height: 100%;
      max-width: 56.25em;
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 1em;
      border-radius: 1em;
      padding: 2em;
      background-color: $white;
    }

    &__interactives {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2em;
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

        &--description {
          .content {
            min-height: 4lh;
          }
        }

        &--date {
          flex-direction: row;
          justify-content: space-between;
          gap: 1em;

          & > * {
            width: 100%;
          }
        }
      }
    }

    &__footer {
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
