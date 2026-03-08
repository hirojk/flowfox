<template>
  <article class="board-card" @click="openCardModal">
    <div class="board-card__content">
      <div class="board-card__wrapper board-card__wrapper--display">
        <h3 class="board-card__heading">{{ localHeading }}</h3>
        <IconSvg :id="localPriority" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { BoardCardType } from '@shared/schemas/boardSchema'
  import { getIcon } from '@services/helpers.ts'
  import { useModalStore } from '@stores/appStore.ts'
  import { useBoardStore } from '@stores/boardStore.ts'
  import { PRIORITY_LIST } from '@constants/priority.ts'

  const props = defineProps<{
    columnId: number
    cardContent: BoardCardType
  }>()

  const localHeading = computed(() => props.cardContent.taskName)
  const localPriority = computed(() => getIcon(PRIORITY_LIST, props.cardContent.priority ?? 'Medium'))

  const openCardModal = () => {
    useModalStore().openModal()
    useBoardStore().setActiveCardId(props.columnId, props.cardContent.id)
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
    background-color: $white;
    cursor: pointer;

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
    }

    &__heading {
      width: 100%;
    }
  }
</style>
