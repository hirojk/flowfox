<template>
  <button
    :id="`board-card-${props.cardContent.id}`"
    class="board-card"
    :aria-label="`Open ${props.cardContent.name} card details`"
    @click="openCardModal"
  >
    <div class="board-card__content">
      <div class="board-card__wrapper board-card__wrapper--header">
        <TextEditor
          mode="editOnce"
          htmlTag="h3"
          textStyle="body"
          removeDefaultStyle
          :text="card.heading"
          :saveEvent="
            (newCardName: string) => updateCard([props.columnId, props.cardContent.id], { name: newCardName })
          "
          :cancelEvent="() => removeCard([props.columnId, props.cardContent.id])"
        />
        <IconSvg
          v-if="cardSettings.priority && card.priority !== 'icon-medium'"
          :id="card.priority"
          class="board-card__priority"
          size="22"
        />
      </div>
      <div
        v-if="cardSettings.description || cardSettings.checklist"
        class="board-card__wrapper board-card__wrapper--group"
      >
        <span v-if="cardSettings.description" class="board-card__description">{{ card.description }}</span>
        <ul v-if="cardSettings.checklist" class="board-card__checklist">
          <li
            v-for="subtask in card.checklist"
            :key="subtask.label"
            :class="`board-card__subtask board-card__subtask${subtask.isChecked ? '--checked' : '--todo'}`"
          >
            <i class="board-card__subtask-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.5" fill="currentColor" stroke="currentColor" stroke-width="1" />
              </svg>
            </i>
            <span class="board-card__subtask-label">{{ subtask.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useBoardCard } from '@composables/useBoard'
  import { openSettingsModal } from '@composables/useModal'
  import { PRIORITY_LIST } from '@constants/priority'
  import { useBoardStore } from '@stores/boardStore'
  import { getIcon } from '@utils/helpers'
  import type { BoardCardType } from '@pagewise/shared'

  import TextEditor from '@components/ui/TextEditor.vue'

  const props = defineProps<{
    columnId: number
    cardContent: BoardCardType
  }>()

  const { updateCard, removeCard } = useBoardCard()

  const boardStore = useBoardStore()

  const card = computed(() => ({
    heading: props.cardContent.name,
    priority: getIcon(PRIORITY_LIST, props.cardContent.priority ?? 'Medium'),
    description: props.cardContent.description,
    checklist: props.cardContent.checklist,
  }))

  const cardSettings = computed(() => {
    const settings = boardStore.activeBoard?.settings.cards

    return {
      priority: settings?.priority ?? true,
      description: settings?.description ?? false,
      checklist: (settings?.checklist ?? false) && card.value.checklist.length > 0,
    }
  })

  const openCardModal = () => {
    openSettingsModal('board-card')
    boardStore.setActiveCardId(props.columnId, props.cardContent.id)
  }
</script>

<style lang="scss" scoped>
  .board-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    width: 100%;
    min-height: 3.375em;
    border-radius: 0.5em;
    padding: 1em;
    background-color: $pw-white;
    font-family: $font-family-primary;
    cursor: pointer;

    &__content {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    &__wrapper {
      display: flex;
      gap: 0.5em;

      &--header {
        justify-content: space-between;
        align-items: center;
      }

      &--group {
        flex-direction: column;
        align-items: flex-start;
        gap: 1em;
      }
    }

    &__heading {
      width: 100%;
    }

    &__description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }

    &__checklist {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    &__subtask {
      display: flex;
      gap: 0.5em;
      color: $ff-grey;

      circle {
        stroke: $ff-grey;
      }

      &--checked {
        .board-card__subtask-label {
          text-decoration: line-through;
        }
      }

      &--todo {
        .board-card__subtask-icon {
          color: $pw-white;
        }
      }
    }
  }
</style>
