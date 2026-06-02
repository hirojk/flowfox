<template>
  <button class="link-ui" @click="linkDropdown?.open($event.currentTarget as HTMLElement)">
    {{ props.label }}
    <DropdownUI v-if="props.dropdown" ref="linkDropdown" :options="props.dropdown ?? []" />
  </button>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import DropdownUI from './DropdownUI.vue'

  interface DropdownItem {
    name: string
    action: () => void
  }

  const props = defineProps<{
    href?: string
    label: string
    dropdown?: DropdownItem[]
  }>()

  const linkDropdown = useTemplateRef<InstanceType<typeof DropdownUI>>('linkDropdown')
</script>

<style lang="scss" scoped>
  .link-ui {
    @include fontButton;

    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.2em;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $pw-primary;
    }
  }
</style>
