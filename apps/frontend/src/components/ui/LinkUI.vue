<template>
  <button class="link-ui">
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    href?: string
    label: string
  }>()
</script>

<style lang="scss" scoped>
  .link-ui {
    @include fontButton;

    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.2em;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $pw-primary;
    }
  }
</style>
