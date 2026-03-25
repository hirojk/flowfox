<template>
  <article class="board-card" @click="openCardModal">
    <div class="board-card__content">
      <div class="board-card__wrapper board-card__wrapper--header">
        <h3 class="board-card__heading">{{ localHeading }}</h3>
        <IconSvg class="board-card__priority" v-if="showPriority" :id="localPriority" size="22" />
      </div>
      <div v-if="showDescription || showChecklistItems" class="board-card__wrapper board-card__wrapper--group">
        <span v-if="showDescription" class="board-card__description">{{ localDescription }}</span>
        <ul v-if="showChecklistItems" class="board-card__checklist">
          <li
            v-for="subtask in localChecklist"
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
  </article>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { BoardCardType } from '@flowfox/shared'
  import { getIcon } from '@services/helpers.ts'
  import { useModalStore } from '@stores/appStore.ts'
  import { useBoardStore } from '@stores/boardStore.ts'
  import { PRIORITY_LIST } from '@constants/priority.ts'

  const props = defineProps<{
    columnId: number
    cardContent: BoardCardType
  }>()

  const modalStore = useModalStore()
  const boardStore = useBoardStore()

  const localHeading = computed(() => props.cardContent.name)
  const localPriority = computed(() => getIcon(PRIORITY_LIST, props.cardContent.priority ?? 'Medium'))
  const localDescription = computed(() => props.cardContent.description)
  const localChecklist = computed(() => props.cardContent.checklist)

  const showPriority = computed(() => boardStore.activeBoard?.settings.cards.priority ?? true)
  const showDescription = computed(() => boardStore.activeBoard?.settings.cards.description ?? false)
  const showChecklist = computed(() => boardStore.activeBoard?.settings.cards.checklist ?? false)
  const showChecklistItems = computed(() => showChecklist.value && localChecklist.value.length > 0)

  const openCardModal = () => {
    modalStore.isOpen = true
    modalStore.currentWindow = 'board-card'
    boardStore.setActiveCardId(props.columnId, props.cardContent.id)
  }
</script>

<style lang="scss" scoped>
  .board-card {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    border-radius: 1em;
    padding: 1em;
    background-color: $ff-white;
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
      line-clamp: 3;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
          color: $ff-white;
        }
      }
    }
  }
</style>
