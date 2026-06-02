<template>
  <button
    class="icon-button"
    :style="{ borderColor: props.color === 'orange' ? colors['pw-primary'] : colors['pw-quinary'] }"
  >
    <IconSvg v-if="props.icon" :id="props.icon" class="icon-button__icon" :size="`${String(props.size)}em`" />
  </button>
</template>

<script setup lang="ts">
  import colors from '@styles/colors.json'

  const props = withDefaults(
    defineProps<{
      icon: string
      size?: number
      color?: 'orange' | 'grey'
    }>(),
    {
      size: 3,
      color: 'orange',
    },
  )
</script>

<style lang="scss" scoped>
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-style: solid;
    border-radius: 0.75em;
    cursor: pointer;
  }
</style>
