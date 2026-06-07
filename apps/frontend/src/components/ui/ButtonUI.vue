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
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { tokens } from '@utils/tokenBuilder'

  const props = defineProps<{
    variant: 'primary' | 'secondary' | 'board' | 'error'
    icon?: string
    size: 'large' | 'small'
    label: string
  }>()

  const labelColor = computed(() => tokens[`color-component-button-${props.variant}-color`])
  const borderBottomColor = computed(() => tokens[`color-component-button-${props.variant}-border`])
  const backgroundColor = computed(() => tokens[`color-component-button-${props.variant}-background`])
</script>

<style lang="scss" scoped>
  .button {
    @include simpleAnimation;

    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    border: 2px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--label-color);
    text-align: center;

    &:not(:has(&__icon)) {
      grid-template-columns: 1fr;
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
  }
</style>
