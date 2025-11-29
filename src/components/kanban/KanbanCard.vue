<template>
  <div class="kanban-card">
    <div class="kanban-card__content">
      <div v-if="editMode" class="kanban-card__edit">
        <q-input
          v-model="localHeading"
          dense
          autofocus
          placeholder="New Task"
        />
        <div class="kanban-card__wrapper">
          <q-icon
            name="check"
            class="kanban-card__icon kanban-card__icon--check"
          />
          <q-icon
            name="cancel"
            class="kanban-card__icon kanban-card__icon--cancel"
            @click="handleRemove"
          />
        </div>
      </div>
      <div v-else>
        <h3>Hallo</h3>
        <q-icon name="more_vert" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const props = defineProps<{
    id: number;
  }>();
  const emit = defineEmits<{
    (e: 'remove', id: number): void;
  }>();

  const editMode = ref(true);

  const localHeading = ref('');

  const handleRemove = () => {
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

    &__edit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
    }

    &__wrapper {
      display: flex;
      gap: 0.5em;
    }

    &__icon {
      cursor: pointer;
    }
  }
</style>
