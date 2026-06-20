<template>
  <button
    :class="['button', `button--${props.size || 'large'}`]"
    :style="{
      '--label-color': labelColor,
      '--border-color': borderBottomColor,
      '--background-color': backgroundColor,
    }"
  >
    <IconSvg v-if="props.icon" :id="props.icon" class="button__icon" />
    {{ props.label }}
    <IconSvg v-if="props.icon" :id="props.icon" class="button__icon button__icon--ghost" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { tokens } from '@utils/tokenBuilder'

  const props = withDefaults(
    defineProps<{
      variant: 'primary' | 'secondary' | 'board' | 'error'
      icon?: string
      size?: 'large' | 'small'
      label: string
    }>(),
    {
      size: 'large',
    },
  )

  const labelColor = computed(() => tokens[`color-component-button-${props.variant}-color`])
  const borderBottomColor = computed(() => tokens[`color-component-button-${props.variant}-border`])
  const backgroundColor = computed(() => tokens[`color-component-button-${props.variant}-background`])
</script>

<style lang="scss" scoped>
  .button {
    @include simpleAnimation;

    display: flex;
    justify-content: space-between;
    gap: 0.5em;
    height: auto;
    border: 2px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--label-color);
    text-align: center;

    &:not(:has(&__icon)) {
      justify-content: center;
    }

    &--large {
      @include fontButton;

      border-radius: 0.75em;
      padding: 0.5em 1em;
    }

    &--small {
      @include fontButtonSmall;

      border-radius: 0.75em;
      padding: 0.5em 1em;
    }

    &__icon--ghost {
      visibility: hidden;
    }
  }
</style>
