<template>
  <button class="link" @click="linkDropdown?.open($event.currentTarget as HTMLElement)">
    {{ props.label }}
    <DropdownUI v-if="props.dropdown" ref="linkDropdown" :options="props.dropdown ?? []" />
  </button>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import DropdownUI from '@components/ui/DropdownUI.vue'
  import type { DropdownItem } from '@typeDefs/globalTypes'

  const props = defineProps<{
    href?: string
    label: string
    dropdown?: DropdownItem[]
  }>()

  const linkDropdown = useTemplateRef<InstanceType<typeof DropdownUI>>('linkDropdown')
</script>

<style lang="scss" scoped>
  .link {
    @include fontButton;
    @include underlineMixin;
  }
</style>
