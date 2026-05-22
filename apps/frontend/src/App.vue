<template>
  <DeletePrompt />
  <router-view />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useAppStore } from '@stores/appStore'

  const appStore = useAppStore()

  const blockIfDropped = (e: Event) => {
    if (!appStore.justDropped) return
    e.stopPropagation()
    e.preventDefault()
  }

  onMounted(() => {
    document.addEventListener('click', blockIfDropped, { capture: true })
    document.addEventListener('touchend', blockIfDropped, { capture: true })
  })
</script>
