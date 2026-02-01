<template>
  <div v-if="!activeCard" class="board-modal__error">
    <div class="board-modal__interactives">
      <button class="board-modal__button board-modal__button--close" @click.stop="useModalStore().closeModal()">
        <iconSvg id="icon-close" />
        Close
      </button>
    </div>
    <div class="board-modal__scrollContent">
      <p>Card not found</p>
    </div>
  </div>
  <template v-else>
    <div class="board-modal__interactives">
      <button class="board-modal__button board-modal__button--close" @click.stop="useModalStore().closeModal()">
        <iconSvg id="icon-close" />
        Close
      </button>
      <ContextMenu
        :events="[
          {
            name: 'Remove Card',
            action: () => {
              removeCard(boardStore.activeCardId as [number, number]);
            },
          },
        ]"
      />
    </div>
    <div class="board-modal__scrollContent">
      <div class="board-modal__header">
        <EditableText
          class="board-modal__header-headline"
          :text="activeCard.taskName"
          :saveEvent="(newTaskName) => updateCard(boardStore.activeCardId, { taskName: newTaskName })"
        />
        <div class="board-modal__header-priority">
          {{ activeCard.priority }}
        </div>
      </div>
      <div class="board-modal__details">
        <div class="board-modal__content board-modal__content--description">
          <strong>Description</strong>
          <div class="board-modal__description">
            <slot name="description">{{ activeCard.description }}</slot>
          </div>
        </div>
        <div class="board-modal__content board-modal__content--checklist">
          <strong>Checklist</strong>
          <ul class="board-modal__checklist">
            <li class="board-modal__checklist-item" v-for="subtask in activeCard.checklist" :key="subtask.label">
              <q-checkbox v-model="subtask.completed" :label="subtask.label" dense />
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
            <li class="board-modal__tags-item" v-for="tag in activeCard.tags" :key="tag.label">
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
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useBoardStore } from 'src/stores/boardStore';
  import { useModalStore } from 'src/stores/appStore';
  import { removeCard, updateCard } from 'src/services/boardCardService';

  import EditableText from 'components/EditableText.vue';

  const boardStore = useBoardStore();

  const activeCard = computed(() => {
    const column = boardStore.columns.find((column) => column.id === boardStore.activeCardId[0]);
    return column?.cards.find((card) => card.id === boardStore.activeCardId[1]);
  });

  const startDate = computed(() => activeCard.value?.startDate ?? new Date());
  const deadline = computed(() => activeCard.value?.deadline ?? new Date());
</script>

<style lang="scss" scoped>
  .board-modal {
    &__interactives {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2em;
    }

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
