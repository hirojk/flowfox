<template>
  <button
    ref="selectMenuRef"
    :class="['select-menu', { 'select-menu--open': isOpen }]"
    :style="{
      backgroundColor,
      '--border-color': borderColor,
      '--surface-color': surfaceColor,
    }"
    @click="selectDropdown?.open($event.currentTarget as HTMLElement)"
  >
    <IconSvg v-if="props.icon" :id="props.icon" />
    <span class="select-menu__label">{{ props.label }}</span>
    <div class="select-menu__dropdown">
      <IconSvg id="icon-low" />
    </div>
    <DropdownUI
      v-if="props.options"
      ref="selectMenuDropdownRef"
      :options="props.options ?? []"
      borderColor="secondary"
      :minWidth="selectMenuWidth"
      @close="isOpen = false"
    />
  </button>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import DropdownUI from '@components/ui/DropdownUI.vue'

  import { tokens } from '@utils/tokenBuilder'

  const props = withDefaults(
    defineProps<{
      icon?: string
      label: string
      options: { name: string; action: () => void }[]
      color?: 'primary' | 'secondary' | 'tertiary'
    }>(),
    {
      color: 'primary',
    },
  )

  const selectMenuRef = ref<HTMLButtonElement>()
  const selectMenuDropdownRef = ref<InstanceType<typeof DropdownUI>>()
  const isOpen = ref(false)

  const selectMenuWidth = computed(() => {
    if (!selectMenuRef.value) return undefined
    return selectMenuRef.value.getBoundingClientRect().width / 16
  })

  const selectDropdown = {
    open: (target: HTMLElement) => {
      selectMenuDropdownRef.value?.open(target)
      isOpen.value = true
    },
  }

  const borderColor = computed(() => tokens[`color-component-select-menu-${props.color}-border`])
  const surfaceColor = computed(() => tokens[`color-component-select-menu-${props.color}-surface`])
  const backgroundColor = computed(() => tokens[`color-component-select-menu-${props.color}-background`])
</script>

<style lang="scss" scoped>
  .select-menu {
    --shadow-width: 2px;

    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25em;
    height: fit-content;
    border: none;
    border-radius: 0.75em;
    padding: 0.25em 3em 0.25em 0.5em;

    &--open {
      --shadow-width: 1px;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: inset 0 0 0 var(--shadow-width) var(--border-color);
      pointer-events: none;
      z-index: 1;
    }

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
      background-color: var(--surface-color);
    }
  }
</style>
