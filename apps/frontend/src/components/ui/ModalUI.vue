<template>
  <dialog ref="dialogRef" class="modal" @click="handleBackdropClick">
    <div class="modal__content" @click.stop>
      <div class="modal__header">
        <div class="modal__navigation">
          <IconButtonUI class="page__project-setting" icon="icon-cancel" color="grey" @click="closeSettingsModal" />
          <div id="modal-interactives"></div>
        </div>
        <div id="modal-headline" class="modal__headline"></div>
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
    background-color: $pw-white;
    box-shadow: 0 0 2.5em 1em color-mix(in srgb, $pw-black 20%, transparent);
    cursor: default;

    &[open] {
      display: flex;
    }

    &::backdrop {
      background-color: rgba($pw-black, 0.5);
    }

    &__content {
      display: grid;
      grid-template-rows: auto 1fr;
      height: 100%;
      padding: 3em;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 3em;
      margin-bottom: 2em;
    }

    &__navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

      // overflow-y: auto;
    }

    &__category {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
      color: $pw-black;

      &--dangerzone {
        color: $pw-error !important;
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
        gap: 2em;
      }

      &-text {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
      }

      &-strong {
        @include fontCopy;

        color: inherit;
        text-transform: none;
      }
    }
  }
</style>
