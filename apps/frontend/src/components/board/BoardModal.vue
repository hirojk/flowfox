<template>
  <div v-if="!activeCard">
    <span>Card not found</span>
  </div>
  <template v-else>
    <Teleport defer to="#modal-interactives">
      <IconButtonUI
        class="page__project-setting"
        icon="icon-menu"
        borderColor="secondary"
        :size="2.5"
        :dropdown="[
          {
            name: 'Remove Card',
            action: () => handleRemoveCard(),
          },
        ]"
      />
    </Teleport>
    <Teleport defer to="#modal-header">
      <InputFieldUI
        htmlTag="h1"
        textStyle="h2"
        :text="activeCard.name"
        borderColor="secondary"
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
        color="tertiary"
      />
    </Teleport>
    <div v-if="modalSettings.description" class="board-modal__content board-modal__content--description">
      <InputFieldUI
        class="board-modal__description"
        htmlTag="p"
        isTextarea
        placeholder="No description"
        :text="activeCard.description"
        borderColor="secondary"
        :saveEvent="(newDescription) => updateCard(boardStore.activeCardId, { description: newDescription })"
      />
    </div>
    <div v-if="modalSettings.checklist" class="modal__category">
      <div class="modal__category-header">
        <h2 class="h4">Checklist</h2>
        <LinkUI label="Create new task" @click="checklistEditor?.addBullet()" />
      </div>
      <ChecklistUI
        ref="checklistEditor"
        class="board-modal__checklist"
        label="task"
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
