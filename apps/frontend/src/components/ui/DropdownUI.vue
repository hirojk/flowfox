<template>
  <dialog ref="dialogRef" class="dropdown" @mousedown="handleBackdropClick">
    <div
      ref="listRef"
      class="dropdown__panel"
      :style="{
        top: `${position.top}px`,
        left: `${position.left}px`,
        borderColor,
        minWidth: props.minWidth ? `${props.minWidth}em` : undefined,
      }"
      @click.stop
    >
      <p v-if="props.description" class="dropdown__description">{{ props.description }}</p>
      <ul class="dropdown__list" role="menu">
        <li v-for="(item, index) in props.options" :key="item.name" class="dropdown__item" role="menuitem">
          <component
            :is="item.route ? RouterLink : 'button'"
            v-bind="item.route ? { to: item.route } : {}"
            class="dropdown__action"
            @click="handleSelect(item)"
            @keydown="handleKeydown($event, index)"
          >
            <IconSvg v-if="item.icon" :id="item.icon" />
            <span>{{ item.name }}</span>
          </component>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'

  import { useAppStore } from '@stores/appStore'
  import { tokens } from '@utils/tokenBuilder'

  const appStore = useAppStore()

  interface SelectItem {
    name: string
    icon?: string
    route?: RouteLocationRaw
    action?: () => void
  }

  const props = withDefaults(
    defineProps<{
      description?: string
      options: SelectItem[]
      borderColor?: 'primary' | 'secondary' | 'tertiary'
      minWidth?: number
    }>(),
    {
      borderColor: 'primary',
    },
  )

  const emit = defineEmits<{ close: [] }>()

  const borderColor = computed(() => tokens[`color-component-dropdown-border-${props.borderColor}`])

  const isOpen = ref(false)
  const dialogRef = ref<HTMLDialogElement>()
  const listRef = ref<HTMLElement>()
  const position = ref({
    top: 0,
    left: 0,
  })

  const open = (anchorElement: HTMLElement) => {
    if (!dialogRef.value) return

    const { bottom, left, width } = anchorElement.getBoundingClientRect()

    position.value = {
      top: bottom + 15,
      left: left + width / 2,
    }

    isOpen.value = true
    dialogRef.value.showModal()

    requestAnimationFrame(() => {
      focusItem(0)
    })
  }

  const close = () => {
    isOpen.value = false
    appStore.justDropped = true
    setTimeout(() => {
      appStore.justDropped = false
    }, 0)
    dialogRef.value?.close()
    emit('close')
  }

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogRef.value) {
      close()
    }
  }

  const handleSelect = (item: SelectItem) => {
    item.action?.()
    close()
  }

  const focusItem = (index: number) => {
    const items = listRef.value?.querySelectorAll<HTMLElement>('.dropdown__action')

    items?.[index]?.focus()
  }

  const handleKeydown = (event: KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusItem((index + 1) % props.options.length)
        break

      case 'ArrowUp':
        event.preventDefault()
        focusItem((index - 1 + props.options.length) % props.options.length)
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        ;(event.currentTarget as HTMLElement).click()
        break

      case 'Escape':
        close()
        break
    }
  }

  defineExpose({ open, isOpen })
</script>

<style scoped lang="scss">
  .dropdown {
    border: none;
    padding: 0;

    &::backdrop {
      background: transparent;
      cursor: default;
    }

    &__panel {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      transform: translateX(-50%);
      border-width: 1px;
      border-style: solid;
      border-radius: 0.5em;
      padding: 0.5em;
      background: $color-semantic-surface-white;
      box-shadow: $box-shadow;
      z-index: 3002;
      cursor: default;
    }

    &__description {
      @include fontCopy;

      padding: 0.25em 0.5em;
      text-transform: capitalize;
      font-weight: $font-weight-bold;
    }

    &__action {
      @include focusVisible;
      @include fontButton;

      display: flex;
      align-items: center;
      gap: 0.5em;
      width: max-content;
      min-width: 7.5em;
      max-width: 20em;
      padding: 0.25em 0.5em;
      color: $color-semantic-text-default;
      cursor: pointer;

      @supports (-webkit-touch-callout: none) {
        &:focus-visible {
          outline: none;
        }
      }

      // @media (hover: hover) and (pointer: fine) {
      //   &:hover {
      //     background: rgba($pw-tertiary, 0.1);
      //   }
      // }
    }
  }
</style>
