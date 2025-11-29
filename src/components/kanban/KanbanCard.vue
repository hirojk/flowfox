<template>
  <div class="kanban-card">
    <div class="kanban-card__content">
      <div
        v-if="editMode"
        class="kanban-card__wrapper kanban-card__wrapper--edit"
      >
        <q-input
          v-model="localHeading"
          dense
          autofocus
          placeholder="New Task"
        />
        <div class="kanban-card__wrapper kanban-card__wrapper--icons">
          <button
            class="kanban-card__icon kanban-card__icon--check"
            @click="saveTaskHeading"
          >
            <q-icon name="check" />
          </button>
          <button
            class="kanban-card__icon kanban-card__icon--cancel"
            @click="handleRemoveCard"
          >
            <q-icon name="cancel" />
          </button>
        </div>
      </div>
      <div v-else class="kanban-card__wrapper kanban-card__wrapper--display">
        <h3 class="kanban-card__heading">{{ localHeading }}</h3>
        <q-icon
          class="kanban-card__icon kanban-card__icon--priority"
          name="priority_high"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const props = defineProps<{
    headline?: string;
    priority?: number;
    id: number;
  }>();
  const emit = defineEmits<{
    (e: 'remove', id: number): void;
  }>();

  const editMode = ref(true);

  const localHeading = ref('');

  const saveTaskHeading = () => {
    if (localHeading.value !== '') {
      editMode.value = false;
    } else {
      handleRemoveCard();
    }
  };

  const handleRemoveCard = () => {
    emit('remove', props.id);
  };

  onMounted(() => {
    editMode.value = true;
  });
</script>

<style lang="scss" scoped>
  .kanban-card {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    border-radius: 1em;
    padding: 1em;
    background-color: $white;

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
