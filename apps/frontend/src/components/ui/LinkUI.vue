<template>
  <component
    :is="props.to ? RouterLink : 'button'"
    :to="props.to"
    class="link"
    @click="!props.to && linkDropdown?.open($event.currentTarget as HTMLElement)"
  >
    {{ props.label }}
    <DropdownUI v-if="props.dropdown && !props.to" ref="linkDropdown" :options="props.dropdown ?? []" />
  </component>
</template>

<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'
  import DropdownUI from '@components/ui/DropdownUI.vue'
  import type { DropdownItem } from '@typeDefs/globalTypes'

  const props = defineProps<{
    to?: string | RouteLocationRaw
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
