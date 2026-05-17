<template>
  <div v-if="appStore.isModalOpen" class="modal" @pointerdown="closeModal">
    <div class="modal__content" @click.stop @pointerdown.stop>
      <div class="modal__header">
        <button class="modal__close" @mousedown="handleCloseMousedown" @click="closeModal">
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
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@stores/appStore'

  const appStore = useAppStore()

  const closeModal = () => {
    if (appStore.isEditing || appStore.isDropdownOpen) return
    appStore.isModalOpen = false
    appStore.modalContent = null
  }

  const handleCloseMousedown = (e: MouseEvent) => {
    if (appStore.isEditing || appStore.isDropdownOpen) e.preventDefault()
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    height: 100dvh;
    padding: 4em 4em 6em;
    background-color: rgba($ff-senary, 0.5);
    z-index: 3001;
    cursor: default;

    &__content {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 1em;
      width: 100%;
      height: 100%;
      max-width: 56.25em;
      max-height: 56.25em;
      border-radius: 1em;
      padding: 2em;
      background-color: $ff-white;
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
