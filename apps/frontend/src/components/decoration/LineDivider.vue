<template>
  <svg
    :class="`line-divider line-divider--${props.variant}`"
    role="none"
    aria-hidden="true"
    viewBox="0 6 1200 8"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path d="M0,10 C300,20 600,0 900,10 C1050,15 1150,5 1200,10" stroke="currentColor" stroke-width="1" fill="none" />
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
      position: absolute;
      bottom: calc($page-padding-y * 2);
    }
  }
</style>
