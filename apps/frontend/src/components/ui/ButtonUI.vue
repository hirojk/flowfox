<template>
  <button :class="['button', `button--${props.variant || 'primary'}`, `button--${props.size || 'large'}`]">
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    variant?: 'primary' | 'secondary' | 'error'
    size?: 'large' | 'small'
    label: string
  }>()
</script>

<style lang="scss" scoped>
  .button {
    @include simpleAnimation;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    text-align: center;

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
