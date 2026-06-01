<template>
  <svg
    :class="`line-divider line-divider--${props.variant}`"
    role="none"
    aria-hidden="true"
    viewBox="0 6 1200 8"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <line x1="0" y1="0" x2="1200" y2="0" stroke="currentColor" stroke-width="1" />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps<{
    variant: 'primary' | 'secondary' | 'tertiary'
  }>()
</script>

<style lang="scss" scoped>
  .line-divider {
    display: block;
    width: 100%;
    height: 0.5em;
    z-index: 1000;
    overflow: visible;

    &--primary {
      color: $pw-primary;
    }

    &--secondary {
      color: $pw-black;
    }

    &--tertiary {
      color: $pw-input-background;

      &:last-child {
        color: transparent;
      }
    }

    &__footer {
      position: fixed;
      bottom: calc($page-padding-y * 2);
    }
  }
</style>
