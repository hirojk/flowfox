<template>
  <div class="kanban-modal">
    <div class="kanban-modal__content">
      <h2 class="kanban-modal__headline">{{ headline }}</h2>
      <p class="kanban-modal__priority">Priority</p>
      <button class="kanban-modal__close-button" @click.stop="$emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    headline: string;
    priority?: number;
  }>();
</script>

<style lang="scss" scoped>
  .kanban-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4em;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    &__content {
      width: 100%;
      height: 100%;
      border-radius: 1em;
      padding: 2em;
      background-color: $white;
    }
  }
</style>
