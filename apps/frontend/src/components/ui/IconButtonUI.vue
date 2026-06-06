<template>
  <button
    class="icon-button"
    :style="{ borderColor }"
    @click="buttonDropdown?.open($event.currentTarget as HTMLElement)"
  >
    <IconSvg v-if="props.icon" :id="props.icon" class="icon-button__icon" :size="`${String(props.size)}em`" />
    <DropdownUI v-if="props.dropdown" ref="buttonDropdown" :options="props.dropdown ?? []" />
  </button>
</template>

<script setup lang="ts">
  import { computed, useTemplateRef } from 'vue'

  import DropdownUI from '@components/ui/DropdownUI.vue'
  import type { DropdownItem } from '@typeDefs/globalTypes'
  import { tokens } from '@utils/tokenBuilder'

  const props = withDefaults(
    defineProps<{
      icon: string
      dropdown?: DropdownItem[]
      size?: number
      borderColor?: 'primary' | 'secondary' | 'tertiary'
    }>(),
    {
      size: 3,
      borderColor: 'primary',
    },
  )

  const borderColor = computed(() => tokens[`color-component-button-icon-border-${props.borderColor}`])
  const buttonDropdown = useTemplateRef<InstanceType<typeof DropdownUI>>('buttonDropdown')
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
