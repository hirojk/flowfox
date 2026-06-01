<template>
  <i class="icon" aria-hidden="true">
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
    stroke: currentcolor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1px;
  }
</style>
