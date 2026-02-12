<template>
  <div class="modal" v-if="modalStore.isOpen" @click="modalStore.closeModal()">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@stores/appStore.ts'

const modalStore = useModalStore()
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4em 4em 6em;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3001;
  cursor: default;

  &__content {
    width: 100%;
    height: 100%;
    max-width: 56.25em;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1em;
    border-radius: 1em;
    padding: 2em;
    background-color: $white;
  }
}
</style>
