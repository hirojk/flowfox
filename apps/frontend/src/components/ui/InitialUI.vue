<template>
  <div class="initial" aria-hidden="true" :style="{ backgroundColor: props.color, width: props.size + 'em' }">
    <IconSvg v-if="props.icon" :id="props.icon" class="initial__icon" :size="`${String(props.size)}em`" />
    <span v-else class="initial__initial">
      {{ useInitials(props.label || '') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { useInitials } from '@composables/useDisplay'

  const props = defineProps<{
    size: number
    icon?: string
    label: string
    color: string
  }>()
</script>

<style lang="scss" scoped>
  .initial {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: v-bind('props.size + "em"');
    height: auto;
    aspect-ratio: 1;
    padding: 1em;
    color: $pw-white;

    &__initial {
      @include fontMixin($font-size-xl);

      font-weight: normal;
    }
  }
</style>
