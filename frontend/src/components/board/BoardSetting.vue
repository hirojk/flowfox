<template>
  <Teleport defer to="#modal-footer">
    <button class="board-setting__delete button button--primary">
      <IconSvg id="icon-cancel" />
      Delete this Board
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import IconSvg from '../IconSvg.vue'
</script>

<style lang="scss" scoped>
  .board-setting {
    &__delete {
      width: 100%;
    }
  }
</style>
