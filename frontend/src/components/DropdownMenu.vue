<template>
  <div class="dropdown">
    <button
      ref="buttonRef"
      class="dropdown__button"
      @click="handleOpen"
      @focusout="close"
      @touchstart.stop
      @touchend.prevent="handleOpen"
    >
      <IconSvg v-if="props.icon" :id="props.icon" />
      <span v-if="props.label">{{ props.label }}</span>
    </button>

    <Teleport to="body">
      <ul
        v-if="isOpen"
        class="dropdown__list"
        :style="{ top: `${listPosition.top}px`, left: `${listPosition.left}px` }"
      >
        <li
          v-for="item in props.options"
          :key="item.name"
          class="dropdown__item"
          @mousedown.prevent="handleSelect(item)"
          @touchend.prevent="handleSelect(item)"
        >
          <IconSvg v-if="item.icon" :id="item.icon" />
          {{ item.name }}
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useAppStore } from '@stores/appStore'

  interface DropdownItem {
    name: string
    icon?: string
    action: () => void
  }

  const props = defineProps<{
    mode: 'select' | 'context'
    icon?: string
    label?: string
    options: DropdownItem[]
  }>()

  const appStore = useAppStore()

  const isOpen = ref(false)

  const buttonRef = ref<HTMLElement | null>(null)
  const listPosition = ref({ top: 0, left: 0 })

  const close = () => {
    isOpen.value = false
    appStore.isDropdownOpen = false
  }

  const handleOpen = () => {
    const rect = buttonRef.value?.getBoundingClientRect()
    if (!rect) return

    listPosition.value = {
      top: rect.bottom,
      left: rect.left + rect.width / 2,
    }
    isOpen.value = !isOpen.value
    appStore.isDropdownOpen = isOpen.value
  }

  const handleSelect = (item: DropdownItem) => {
    item.action()
    close()
  }

  const handleClickOutside = (e: MouseEvent | TouchEvent) => {
    if (!isOpen.value) return

    const target = e.target as HTMLElement
    if (buttonRef.value?.contains(target) || target.closest('.dropdown__list')) return
    close()
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchend', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('touchend', handleClickOutside)
  })
</script>

<style lang="scss" scoped>
  .dropdown {
    position: relative;

    &__button {
      display: flex;
      align-items: center;
      gap: 0.5em;
    }

    &__list {
      position: fixed;
      transform: translateX(-50%);
      margin-top: 0.75em;
      border-radius: 0.5em;
      padding: 0.5em 0;
      background: $ff-white;
      box-shadow: 0 2px 8px rgba($ff-grey, 0.5);
      z-index: 3002;
    }

    &__item {
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
