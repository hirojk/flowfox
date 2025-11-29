<template>
  <div class="kanban-card">
    <div class="kanban-card-wrapper">
      <h3 class="kanban-card-heading">Card</h3>
      <q-icon name="more_vert" />
    </div>
    <div class="kanban-card-content">
      <p>Description</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .kanban-card {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    border-radius: 1em;
    padding: 1em;
    background-color: $white;

    &-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 0.5em;
    }

    &-heading {
      width: 100%;
    }
  }
</style>
