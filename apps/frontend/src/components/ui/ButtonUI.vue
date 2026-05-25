<template>
  <button :class="['button', `button--${props.variant || 'primary'}`]">
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    variant?: 'primary' | 'secondary'
    size?: 'large' | 'small'
    label: string
  }>()
</script>

<style lang="scss" scoped>
  .button {
    @include simpleAnimation;
    @include fontMixin(map.get($font-size, md));

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    border-radius: 0.75em;
    padding: 1em 4em;
    font-family: $font-family-secondary;
    text-align: center;

    &--primary {
      background-color: $ff-black;
      color: $ff-white;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $ff-secondary;
        }
      }
    }

    &--secondary {
      background-color: $ff-grey;
      color: $ff-white;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $ff-black;
        }
      }
    }

    &--tertiary {
      background-color: $ff-white;
      color: $ff-black;

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
          background-color: $ff-grey;
          color: $ff-white;
        }
      }
    }
  }
</style>
