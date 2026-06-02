<template>
  <div
    class="initial"
    aria-hidden="true"
    :style="{ backgroundColor: props.backgroundColor || undefined, color: props.color }"
  >
    <IconSvg v-if="props.icon" :id="props.icon" class="initial__icon" :size="`${String(props.size)}em`" />
    <span v-else class="initial__text">
      {{ useInitials(props.label || '') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useDisplay'

  const props = defineProps<{
    size: number
    icon?: string
    label?: string
    color?: string
    backgroundColor?: string
  }>()
</script>

<style lang="scss" scoped>
  .initial {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: auto;
    aspect-ratio: 1;
    border-radius: 1em;
    padding: 1em;
    color: inherit;
    user-select: none;

    &__text {
      @include fontMixin($font-size-xl);

      min-width: 1.5em;
      font-weight: normal;
      font-family: $font-family-primary;
    }
  }
</style>
