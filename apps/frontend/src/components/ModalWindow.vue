<template>
  <dialog ref="dialogRef" class="modal" @click="handleBackdropClick">
    <div class="modal__content" @click.stop>
      <div class="modal__header">
        <button class="modal__close" aria-label="Close dialog" @click="closeSettingsModal">
          <IconSvg id="icon-cancel" />
          Close
        </button>
        <div id="modal-interactives"></div>
      </div>
      <div class="modal__scrollContent">
        <slot></slot>
      </div>
      <div id="modal-footer" class="modal__footer"></div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { closeSettingsModal } from '@composables/useModal'

  const dialogRef = ref<HTMLDialogElement>()

  const handleBackdropClick = () => {
    dialogRef.value?.close()
  }
</script>

<style lang="scss" scoped>
  .modal {
    display: none;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    height: 100%;
    max-width: 56.25em;
    max-height: 56.25em;
    border: none;
    border-radius: 1em;
    padding: 0;
    background-color: $ff-white;
    cursor: default;

    &[open] {
      display: flex;
    }

    &::backdrop {
      background-color: rgba($ff-senary, 0.5);
    }

    &__content {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 1em;
      height: 100%;
      padding: 2em;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2em;
    }

    &__close {
      display: flex;
      align-items: center;
      gap: 0.25em;
    }

    &__scrollContent {
      display: flex;
      flex-direction: column;
      gap: 2em;
      padding-right: 1em;
      overflow-y: auto;
    }
  }
</style>
