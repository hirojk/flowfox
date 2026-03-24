<template>
  <dialog ref="dialogRef" class="delete-prompt">
    <p>{{ message }}</p>
    <div class="delete-prompt__buttons">
      <button @click="confirm" autofocus>Delete</button>
      <button @click="close">Cancel</button>
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
    &__buttons {
      display: flex;
      gap: 1em;
    }
  }
</style>
