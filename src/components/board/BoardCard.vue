<template>
  <article class="board-card" @click="openEditModal">
    <div class="board-card__content">
      <div
        v-if="editMode"
        class="board-card__wrapper board-card__wrapper--edit"
      >
        <q-input
          v-model="localHeading"
          dense
          autofocus
          placeholder="New Task"
        />
        <div class="board-card__wrapper board-card__wrapper--icons">
          <button
            class="board-card__icon board-card__icon--check"
            @click.stop="saveTaskHeading"
          >
            <q-icon name="check" />
          </button>
          <button
            class="board-card__icon board-card__icon--cancel"
            @click.stop="handleRemoveCard"
          >
            <q-icon name="cancel" />
          </button>
        </div>
      </div>
      <div v-else class="board-card__wrapper board-card__wrapper--display">
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
  const emit = defineEmits<{
    (e: 'remove', id: number): void;
  }>();
  const modalStore = useModalStore();
  const boardStore = useBoardStore();

  const editMode = ref(modalStore.isOpen);
  const localHeading = ref(props.cardContent.taskName);
  const localPriority = ref(
    selectIcon(PRIORITY_LIST, props.cardContent.priority ?? 'Medium'),
  );

  const openEditModal = () => {
    if (!editMode.value) {
      modalStore.openModal();
      boardStore.setActiveCardId(props.columnId, props.cardContent.id);
    }
  };

  const saveTaskHeading = () => {
    if (localHeading.value !== '') {
      editMode.value = false;
    } else {
      handleRemoveCard();
    }
  };

  const handleRemoveCard = () => {
    emit('remove', props.cardContent.id);
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
