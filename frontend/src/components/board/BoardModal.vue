<template>
  <div v-if="!activeCard" class="board-modal__error">
    <span>Card not found</span>
  </div>
  <template v-else>
    <Teleport defer to="#modal-interactives">
      <DropdownMenu
        mode="context"
        icon="icon-menu"
        :options="[
          {
            name: 'Remove Card',
            action: () => removeCard(boardStore.activeCardId as [number, number]),
          },
        ]"
      />
    </Teleport>
    <section class="board-modal__header">
      <TextEditor
        class="board-modal__header-headline"
        htmlTag="strong"
        :text="activeCard.taskName"
        :saveEvent="(newTaskName) => updateCard(boardStore.activeCardId, { taskName: newTaskName })"
      />
      <DropdownMenu
        mode="select"
        :label="activeCard.priority"
        :icon="getIcon(PRIORITY_LIST, activeCard.priority ?? 'Medium')"
        :options="
          PRIORITY_LIST.map((p) => ({
            name: p.name,
            icon: p.icon,
            action: () => updateCard(boardStore.activeCardId, { priority: p.name as PriorityName }),
          }))
        "
      />
    </section>
    <section class="board-modal__details">
      <div class="board-modal__content board-modal__content--description">
        <strong class="board-modal__label">Description</strong>
        <TextEditor
          class="board-modal__description"
          htmlTag="p"
          multiline
          :text="activeCard.description"
          :saveEvent="(newDescription) => updateCard(boardStore.activeCardId, { description: newDescription })"
        />
      </div>
      <div class="board-modal__content board-modal__content--checklist">
        <strong class="board-modal__label">Checklist</strong>
        <CheckboxEditor
          class="board-modal__checklist"
          :checkboxes="activeCard.checklist"
          :saveEvent="(newChecklist) => updateCard(boardStore.activeCardId, { checklist: newChecklist })"
        />
      </div>
      <!-- <div class="board-modal__content board-modal__content--date">
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
        </div> -->
    </section>
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
  import { PRIORITY_LIST } from '@constants/priority.ts'
  import { removeCard, updateCard } from '@services/boardCardService.ts'
  import { getIcon } from '@services/helpers.ts'
  import type { BoardCardType, BoardColumnType, PriorityName } from '@flowfox/shared'

  import TextEditor from '@components/fields/TextEditor.vue'
  import CheckboxEditor from '@components/fields/CheckboxEditor.vue'
  // import DatePicker from '@components/fields/DatePicker.vue'

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
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
      margin-bottom: 2em;

      &-headline {
        @include fontMixin(map-get($font-size, xl));
        width: 100%;
        cursor: text;
      }
    }

    &__label {
      @include fontMixin(map-get($font-size, md));
      font-weight: bold;
      margin-bottom: 0.5em;
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
