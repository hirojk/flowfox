<template>
  <dialog ref="dialogRef" class="delete-prompt">
    <span class="delete-prompt__message">{{ message }}</span>
    <div class="delete-prompt__button-group">
      <button class="delete-prompt__button delete-prompt__button--delete" autofocus @click="confirm">
        <IconSvg id="icon-cancel" /> Delete
      </button>
      <button class="delete-prompt__button delete-prompt__button--cancel" @click="close">Cancel</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useDeletePrompt } from '@composables/usePrompt'

  const { isOpen, message, confirm, close } = useDeletePrompt()

  const dialogRef = ref<HTMLDialogElement | null>(null)

  watch(isOpen, (stateBool) => {
    if (stateBool) dialogRef.value?.showModal()
    else dialogRef.value?.close()
  })
</script>

<style lang="scss" scoped>
  .delete-prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    width: 100%;
    max-width: 25em;
    border: none;
    border-radius: 1em;
    padding: 2em;

    &__message {
      @include fontMixin(map.get($font-size, md));

      max-width: 15em;
      text-align: center;
    }

    &__button-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      width: 10em;
      border-radius: 1em;
      padding: 0.8em 2em;
      text-align: center;

      &--delete {
        border: 2px solid $ff-error;
        color: $ff-error;
      }

      &--cancel {
        background-color: rgba($ff-grey, 0.75);
        color: $ff-white;
      }
    }
  }
</style>
