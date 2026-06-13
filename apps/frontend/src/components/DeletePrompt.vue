<template>
  <dialog ref="dialogRef" class="delete-prompt">
    <span class="delete-prompt__message">{{ message }}</span>
    <div class="delete-prompt__button-group">
      <ButtonUI
        class="delete-prompt__button delete-prompt__button--confirm"
        variant="error"
        label="Delete"
        autofocus
        @click="confirm"
      />
      <ButtonUI
        class="delete-prompt__button delete-prompt__button--cancel"
        variant="secondary"
        label="Cancel"
        autofocus
        @click="close"
      />
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useDeletePrompt } from '@composables/usePromptWindow'

  const { isOpen, message, confirm, close } = useDeletePrompt()

  const dialogRef = ref<HTMLDialogElement | null>(null)

  watch(isOpen, (stateBool) => {
    if (stateBool) dialogRef.value?.showModal()
    else dialogRef.value?.close()
  })
</script>

<style lang="scss" scoped>
  .delete-prompt {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    width: 100%;
    max-width: 25em;
    border: none;
    border-radius: 1em;
    padding: 2em;
    box-shadow: $box-shadow;

    &[open] {
      display: flex;
    }

    &__message {
      @include fontMixin('md');

      max-width: 15em;
      text-align: center;
    }

    &__button-group {
      display: flex;
      justify-content: center;
      gap: 1em;
      width: 100%;
    }

    &__button {
      min-width: 8em;
    }
  }
</style>
