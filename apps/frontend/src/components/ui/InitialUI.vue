<template>
  <div
    class="initial"
    aria-hidden="true"
    :style="{ backgroundColor: props.backgroundColor, color: props.color, width: props.size + 'em' }"
  >
    <IconSvg v-if="props.icon" :id="props.icon" class="initial__icon" :size="`${String(props.size)}em`" />
    <span v-else class="initial__initial">
      {{ useInitials(props.label || '') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useDisplay'

  const props = withDefaults(
    defineProps<{
      size: number
      icon?: string
      label: string
      color?: string
      backgroundColor?: string
    }>(),
    {
      backgroundColor: 'transparent',
    },
  )
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
    color: $pw-white;
    user-select: none;

    &__initial {
      @include fontMixin($font-size-xl);

      font-weight: normal;
    }
  }
</style>
