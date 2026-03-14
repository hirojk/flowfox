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
              removeCard(boardStore.activeCardId as [number, number])
            },
          },
        ]"
      />
    </div>
    <div class="board-modal__scrollContent">
      <div class="board-modal__header">
        <TextEditor
          class="board-modal__header-headline"
          htmlTag="strong"
          :text="activeCard.taskName"
          :saveEvent="(newTaskName) => updateCard(boardStore.activeCardId, { taskName: newTaskName })"
        />
        <SelectEditor
          class="board-modal__header-priority"
          :options="PRIORITY_LIST.map((priority) => priority.name)"
          :icon="getIcon(PRIORITY_LIST, activeCard.priority ?? 'Medium')"
          :selected="activeCard.priority"
          :saveEvent="(newPriority) => updateCard(boardStore.activeCardId, { priority: newPriority as PriorityName })"
        />
      </div>
      <div class="board-modal__details">
        <div class="board-modal__content board-modal__content--description">
          <strong>Description</strong>
          <TextEditor
            class="board-modal__description"
            htmlTag="p"
            multiline
            :text="activeCard.description"
            :saveEvent="(newDescription) => updateCard(boardStore.activeCardId, { description: newDescription })"
          />
        </div>
        <div class="board-modal__content board-modal__content--checklist">
          <strong>Checklist</strong>
          <CheckboxEditor
            class="board-modal__checklist"
            :checkboxes="activeCard.checklist"
            :saveEvent="(newChecklist) => updateCard(boardStore.activeCardId, { checklist: newChecklist })"
          />
        </div>
        <div class="board-modal__content board-modal__content--date">
          <div class="board-modal__date board-modal__date--start">
            <strong>Start Date</strong>
            <DatePicker
              :dateInput="activeCard.startDate"
              :saveEvent="(newDate) => updateCard(boardStore.activeCardId, { startDate: newDate })"
            />
          </div>
          <div class="board-modal__date board-modal__date--deadline">
            <strong>Deadline</strong>
            <DatePicker
              :dateInput="activeCard.deadline"
              :options="{ disableTo: activeCard.startDate }"
              :saveEvent="(newDate) => updateCard(boardStore.activeCardId, { deadline: newDate })"
            />
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
  import { computed } from 'vue'
  import { useBoardStore } from '@stores/boardStore.ts'
  import { useModalStore } from '@stores/appStore.ts'
  import { removeCard, updateCard } from '@services/boardCardService.ts'
  import { PRIORITY_LIST } from '@constants/priority.ts'
  import { getIcon } from '@services/helpers.ts'
  import type { BoardCardType, BoardColumnType } from '@flowfox/shared'
  import type { PriorityName } from '@/constants/priority'

  import TextEditor from '@components/fields/TextEditor.vue'
  import SelectEditor from '@components/fields/SelectEditor.vue'
  import CheckboxEditor from '@components/fields/CheckboxEditor.vue'
  import DatePicker from '@components/fields/DatePicker.vue'

  const boardStore = useBoardStore()

  const activeCard = computed(() => {
    const column = boardStore.activeBoard?.columns.find(
      (column: BoardColumnType) => column.id === boardStore.activeCardId[0],
    )
    return column?.cards.find((card: BoardCardType) => card.id === boardStore.activeCardId[1])
  })
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
      overflow-y: auto;
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
