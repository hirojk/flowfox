<template>
  <button class="select-menu" @click="selectDropdown?.open($event.currentTarget as HTMLElement)">
    <IconSvg v-if="props.icon" :id="props.icon" />
    <span class="select-menu__label">{{ props.label }}</span>
    <div class="select-menu__dropdown">
      <IconSvg id="icon-low" />
    </div>
    <DropdownUI v-if="props.options" ref="buttonDropdown" :options="props.options ?? []" />
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import DropdownUI from '@components/ui/DropdownUI.vue'

  const props = defineProps<{
    icon?: string
    label: string
    options: { name: string; action: () => void }[]
  }>()

  const buttonDropdown = ref<InstanceType<typeof DropdownUI>>()

  const selectDropdown = {
    open: (target: HTMLElement) => {
      buttonDropdown.value?.open(target)
    },
  }
</script>

<style lang="scss" scoped>
  .select-menu {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25em;
    height: fit-content;
    border: 2px solid $pw-quinary;
    border-radius: 0.75em;
    padding: 0.25em 3em 0.25em 0.5em;

    &__label {
      width: 100%;
      min-width: 4em;
    }

    &__dropdown {
      position: absolute;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2em;
      height: 100%;
      border-radius: 0 0.5em 0.5em 0;
      background-color: $pw-quinary;
    }
  }
</style>
