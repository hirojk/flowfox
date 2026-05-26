<template>
  <dialog ref="dialogRef" class="dropdown" @mousedown="handleBackdropClick">
    <ul
      ref="listRef"
      class="dropdown__list"
      role="menu"
      :style="{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }"
      @click.stop
    >
      <li v-for="(item, index) in props.options" :key="item.name" class="dropdown__item" role="menuitem">
        <component
          :is="item.route ? RouterLink : 'button'"
          v-bind="item.route ? { to: item.route } : {}"
          class="dropdown__action"
          @click="handleSelect(item)"
          @keydown="handleKeydown($event, index, item)"
        >
          <IconSvg v-if="item.icon" :id="item.icon" />
          <span>{{ item.name }}</span>
        </component>
      </li>
    </ul>
  </dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'

  interface SelectItem {
    name: string
    icon?: string
    route?: RouteLocationRaw
    action?: () => void
  }

  const props = defineProps<{
    options: SelectItem[]
  }>()

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
      top: bottom + 12,
      left: left + width / 2,
    }

    dialogRef.value.showModal()

    requestAnimationFrame(() => {
      ;(document.activeElement as HTMLElement | null)?.blur()
    })
  }

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogRef.value) {
      dialogRef.value?.close()
    }
  }

  const handleSelect = (item: SelectItem) => {
    item.action?.()
    dialogRef.value?.close()
  }

  const focusItem = (index: number) => {
    const items = listRef.value?.querySelectorAll<HTMLElement>('.dropdown__action')

    items?.[index]?.focus()
  }

  const handleKeydown = (event: KeyboardEvent, index: number, item: SelectItem) => {
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
        handleSelect(item)
        break

      case 'Escape':
        dialogRef.value?.close()
        break
    }
  }

  defineExpose({ open })
</script>

<style scoped lang="scss">
  .dropdown {
    border: none;
    padding: 0;

    &::backdrop {
      background: transparent;
    }

    &__list {
      position: fixed;
      transform: translateX(-50%);
      border-radius: 0.5em;
      padding: 0.5em 0;
      background: $pw-white;
      box-shadow: 0 2px 8px rgba($ff-grey, 0.5);
      z-index: 3002;
    }

    &__action {
      @include focusVisible;

      display: flex;
      align-items: center;
      gap: 0.5em;
      width: max-content;
      min-width: 10em;
      max-width: 20em;
      padding: 0.5em 1em;
      cursor: pointer;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
</style>
