<template>
  <svg :width="size" :height="size" aria-hidden="true">
    <use class="iconSvg" :href="`/assets/iconSet.svg#${id}`"></use>
  </svg>
</template>

<script setup lang="ts">
  const { id, size = 24 } = defineProps<{
    id: string
    size?: number
  }>()
</script>

<style lang="scss" scoped>
  .iconSvg {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2px;
  }
</style>
