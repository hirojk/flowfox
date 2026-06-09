<template>
  <dialog ref="dialogRef" class="modal" @click="handleBackdropClick">
    <div class="modal__content" @click.stop>
      <div class="modal__navigation">
        <IconButtonUI icon="icon-cancel" borderColor="secondary" :size="2.5" @click="closeSettingsModal" />
        <div id="modal-interactives"></div>
      </div>
      <div id="modal-header" class="modal__header"></div>
      <div class="modal__scrollContent">
        <slot></slot>
      </div>
      <div id="modal-footer" class="modal__footer"></div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import IconButtonUI from '@components/ui/IconButtonUI.vue'
  import { closeSettingsModal } from '@composables/useModal'

  const dialogRef = ref<HTMLDialogElement>()

  const handleBackdropClick = () => {
    dialogRef.value?.close()
  }
</script>

<style lang="scss">
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
    background-color: $color-semantic-surface-white;
    box-shadow: 0 0 2.5em 1em $color-semantic-box-shadow;
    cursor: default;

    &[open] {
      display: flex;
    }

    &::backdrop {
      background-color: $color-semantic-overlay-backdrop;
    }

    &__content {
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      height: 100%;
      padding: 3em;
    }

    &__navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3em;
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 3em;
      margin-bottom: 2em;
    }

    &__scrollContent {
      display: flex;
      flex-direction: column;
      gap: 3em;
      padding-right: 1em;

      // overflow-y: auto;
    }

    &__category {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
      color: $color-semantic-text-default;

      &--dangerzone {
        color: $color-semantic-feedback-error !important;
      }

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-headline {
        color: inherit;
      }

      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2em;

        &--vertical {
          flex-direction: column;
        }

        &--grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2em;
        }
      }

      &-textWrapper {
        display: flex;
        flex-direction: column;
      }

      &-text {
        @include fontCopy;

        color: inherit;

        &--strong {
          font-weight: $font-weight-bold;
          text-transform: none;
        }
      }
    }
  }
</style>
