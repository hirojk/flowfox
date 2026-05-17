<template>
  <div class="selectmenu">
    <button ref="buttonRef" class="selectmenu__button" aria-haspopup="menu" @click="toggleMenu">
      <IconSvg v-if="props.icon" :id="props.icon" />
      <span v-if="props.label">
        {{ props.label }}
      </span>
    </button>

    <dialog ref="dialogRef" class="selectmenu__menu" @click="handleBackdropClick">
      <ul
        ref="listRef"
        class="selectmenu__list"
        role="menu"
        :style="{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }"
        @click.stop
      >
        <li
          v-for="(item, index) in props.options"
          :key="item.name"
          class="selectmenu__item"
          tabindex="0"
          @click="handleSelect(item)"
          @keydown="handleKeydown($event, index, item)"
        >
          <IconSvg v-if="item.icon" :id="item.icon" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface SelectItem {
    name: string
    icon?: string
    action?: () => void
  }

  const props = defineProps<{
    icon?: string
    label?: string
    options: SelectItem[]
  }>()

  const buttonRef = ref<HTMLElement>()
  const dialogRef = ref<HTMLDialogElement>()
  const listRef = ref<HTMLElement>()
  const position = ref({
    top: 0,
    left: 0,
  })

  const toggleMenu = () => {
    if (!dialogRef.value || !buttonRef.value) return

    if (dialogRef.value.open) {
      dialogRef.value.close()
      return
    }

    const { bottom, left, width } = buttonRef.value.getBoundingClientRect()

    position.value = {
      top: bottom + 12,
      left: left + width / 2,
    }

    dialogRef.value.showModal()
  }

  const handleBackdropClick = () => {
    dialogRef.value?.close()
  }

  const handleSelect = (item: SelectItem) => {
    item.action?.()
    dialogRef.value?.close()
  }

  const focusItem = (index: number) => {
    const items = listRef.value?.querySelectorAll<HTMLElement>('.selectmenu__item')

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
        buttonRef.value?.focus()
        break
    }
  }
</script>

<style scoped lang="scss">
  .selectmenu {
    &__button {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    &__menu {
      border: none;
      padding: 0;

      &::backdrop {
        background: transparent;
      }
    }

    &__list {
      position: fixed;
      transform: translateX(-50%);
      border-radius: 0.5em;
      padding: 0.5em 0;
      background: $ff-white;
      box-shadow: 0 2px 8px rgba($ff-grey, 0.5);
      z-index: 3002;
    }

    &__item {
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
