<template>
  <i class="icon" aria-hidden="true">
    <svg :width="props.size" :height="props.size">
      <use class="iconSvg" :href="`/assets/iconSet.svg#${props.id}`"></use>
    </svg>
  </i>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      id: string
      size?: string | number
    }>(),
    {
      size: 24,
    },
  )
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
