<template>
  <i class="icon">
    <svg :width="size" :height="size">
      <use class="iconSvg" :href="`/assets/iconSet.svg#${id}`"></use>
    </svg>
  </i>
</template>

<script setup lang="ts">
  const { id, size = 24 } = defineProps<{
    id: string
    size?: string | number
  }>()
</script>

<style lang="scss" scoped>
  .icon {
    line-height: 0;
  }

  .iconSvg {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.25px;
  }
</style>
