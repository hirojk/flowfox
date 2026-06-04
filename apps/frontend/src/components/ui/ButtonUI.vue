<template>
  <button :class="['button', `button--${props.variant || 'primary'}`, `button--${props.size || 'large'}`]">
    <IconSvg v-if="props.icon" :id="props.icon" class="button__icon" />
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    variant?: 'primary' | 'secondary' | 'board' | 'error'
    icon?: string
    size?: 'large' | 'small'
    label: string
  }>()
</script>

<style lang="scss" scoped>
  .button {
    @include simpleAnimation;

    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    text-align: center;

    &:not(:has(&__icon)) {
      grid-template-columns: 1fr;
    }

    &--primary {
      background-color: $pw-black;
      color: $pw-white;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $ff-secondary;
        }
      }
    }

    &--secondary {
      border: 2px solid $pw-black;
      background-color: $pw-white;
      color: $pw-black;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $pw-black;
          color: $pw-white;
        }
      }
    }

    &--tertiary {
      background-color: $pw-white;
      color: $pw-black;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $ff-grey;
          color: $pw-white;
        }
      }
    }

    &--board {
      justify-content: space-between;
      background-color: rgba($pw-quaternary, 0.5);
      color: $pw-black;
    }

    &--error {
      border: 2px solid $pw-error;
      background-color: $pw-white;
      color: $pw-error;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $pw-error;
          color: $pw-white;
        }
      }
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
