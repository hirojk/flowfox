<template>
  <div v-if="!activeCard" class="board-modal__error">
    <span>Card not found</span>
  </div>
  <template v-else>
    <Teleport defer to="#modal-interactives">
      <IconButtonUI
        class="page__project-setting"
        icon="icon-menu"
        borderColor="secondary"
        :size="3"
        :dropdown="[
          {
            name: 'Remove Card',
            action: () => handleRemoveCard(),
          },
        ]"
      />
    </Teleport>
    <Teleport defer to="#modal-headline">
      <InputFieldUI
        class="board-modal__header-headline"
        htmlTag="h1"
        textStyle="h2"
        :text="activeCard.name"
        :saveEvent="(newCardName) => updateCard(boardStore.activeCardId, { name: newCardName })"
      />
      <SelectMenuUI
        :icon="getIcon(PRIORITY_LIST, activeCard.priority ?? 'Medium')"
        :label="activeCard.priority"
        :options="
          PRIORITY_LIST.map((p) => ({
            name: p.name,
            icon: p.icon,
            action: () => updateCard(boardStore.activeCardId, { priority: p.name as PriorityType }),
          }))
        "
      />
    </Teleport>
    <section class="board-modal__details">
      <div v-if="modalSettings.description" class="board-modal__content board-modal__content--description">
        <InputFieldUI
          class="board-modal__description"
          htmlTag="p"
          isTextarea
          :text="activeCard.description"
          :saveEvent="(newDescription) => updateCard(boardStore.activeCardId, { description: newDescription })"
        />
      </div>
      <div v-if="modalSettings.checklist" class="modal__category">
        <div class="modal__category-header">
          <h2 class="modal__category-text h4">Checklist</h2>
          <LinkUI label="Create new To-Do" @click="checklistEditor?.addBullet()" />
        </div>
        <ChecklistUI
          ref="checklistEditor"
          class="board-modal__checklist"
          :checklist="activeCard.checklist"
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
  import { ref, computed } from 'vue'
  import { useBoardCard } from '@composables/useBoard'
  import { closeSettingsModal } from '@composables/useModal'
  import { PRIORITY_LIST } from '@constants/priority'
  import { useBoardStore } from '@stores/boardStore'
  import { getIcon } from '@utils/helpers'
  import type { BoardCardType, BoardColumnType, PriorityType } from '@pagewise/shared'

  import IconButtonUI from '@components/ui/IconButtonUI.vue'
  import InputFieldUI from '@components/ui/InputFieldUI.vue'
  import ChecklistUI from '@components/ui/ChecklistUI.vue'
  import SelectMenuUI from '../ui/SelectMenuUI.vue'
  // import DatePicker from '@components/ui/DatePicker.vue'

  const { updateCard, removeCard } = useBoardCard()
  const boardStore = useBoardStore()

  const checklistEditor = ref<InstanceType<typeof ChecklistUI>>()

  const modalSettings = computed(() => {
    const settings = boardStore.activeBoard?.settings.modal

    return {
      priority: settings?.priority ?? true,
      description: settings?.description ?? false,
      checklist: settings?.checklist ?? false,
    }
  })

  const activeCard = computed(() => {
    const column = boardStore.activeBoard?.columns.find(
      (column: BoardColumnType) => column.id === boardStore.activeCardId[0],
    )
    return column?.cards.find((card: BoardCardType) => card.id === boardStore.activeCardId[1])
  })

  const handleRemoveCard = () => {
    removeCard(boardStore.activeCardId as [number, number])
    closeSettingsModal()
  }
</script>

<style lang="scss" scoped>
  .board-modal {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2em;
      margin-bottom: 2em;

      &-headline {
        @include fontMixin($font-size-xl);

        width: 100%;
        font-weight: normal;
        cursor: text;
      }
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: 4em;
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

    &__label {
      @include fontMixin($font-size-md);

      margin-bottom: 0.5em;
      padding: 0.2em;
      font-weight: bold;
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
      flex-wrap: wrap;
      gap: 0.5em;
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
        justify-content: center;
        width: 100%;
        border-radius: 1em;
        padding: 1em 2em;
        background-color: $ff-quaternary;
      }
    }
  }
</style>
