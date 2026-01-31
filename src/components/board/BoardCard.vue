<template>
  <article class="board-card" @click="openEditModal">
    <div class="board-card__content">
      <div class="board-card__wrapper board-card__wrapper--display">
        <h3 class="board-card__heading">{{ localHeading }}</h3>
        <IconSvg :id="localPriority" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { BoardCardType } from 'src/types/boardType';
  import { selectIcon } from 'src/composables/useGlobal';
  import { useBoardStore } from 'src/stores/boardStore';
  import { useModalStore } from 'src/stores/appStore';
  import { PRIORITY_LIST } from 'src/utils/priority';

  const props = defineProps<{
    columnId: number;
    cardContent: BoardCardType;
  }>();

  const localHeading = ref(props.cardContent.taskName);
  const localPriority = ref(selectIcon(PRIORITY_LIST, props.cardContent.priority ?? 'Medium'));

  const openEditModal = () => {
    useModalStore().openModal();
    useBoardStore().setActiveCardId(props.columnId, props.cardContent.id);
  };
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
