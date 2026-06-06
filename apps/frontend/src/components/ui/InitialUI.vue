<template>
  <div
    class="initial"
    aria-hidden="true"
    :style="{ backgroundColor: props.backgroundColor || undefined, color: props.color }"
  >
    <IconSvg
      v-if="props.icon"
      :id="props.icon"
      class="initial__content initial__content--icon"
      :size="`${String(props.size)}em`"
    />
    <span v-else class="initial__content initial__content--text" :style="{ fontSize: `calc(${props.size} * 0.667em)` }">
      {{ useInitials(props.label || '') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useDisplay'

  const props = defineProps<{
    icon?: string
    label?: string
    color: string
    backgroundColor?: string
    size: number
  }>()
</script>

<style lang="scss" scoped>
  .initial {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    border-radius: 1em;
    padding: 1em;
    user-select: none;

    &__content {
      &--text {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 1.5em;
        font-weight: normal;
        font-family: $font-family-primary;
      }
    }
  }
</style>
