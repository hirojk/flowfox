<template>
  <div
    class="initial"
    aria-hidden="true"
    :style="{
      '--label-color': labelColor,
      '--background-color': backgroundColor,
    }"
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
  import { computed } from 'vue'
  import { useInitials } from '@composables/useDisplay'
  import { tokens } from '@utils/tokenBuilder'

  const props = withDefaults(
    defineProps<{
      icon?: string
      label?: string
      variant: 'primary' | 'secondary' | 'transparent'
      usage?: 'project' | 'page' | 'neutral'
      theme: 'orange'
      size?: number
    }>(),
    {
      usage: 'neutral',
      size: 3,
    },
  )

  const labelColor = computed(() => {
    if (props.variant === 'transparent') return 'inherit'
    return tokens[`color-theme-${props.usage}-${props.theme}-color-${props.variant}`]
  })
  const backgroundColor = computed(() => {
    if (props.variant === 'transparent') return 'transparent'
    return tokens[`color-theme-${props.usage}-${props.theme}-background-${props.variant}`]
  })
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
    background-color: var(--background-color);

    &__content {
      &--text {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 1.5em;
        color: var(--label-color);
        font-weight: normal;
        font-family: $font-family-primary;
      }
    }
  }
</style>
