import { ref } from 'vue'
import router from '@/router'
import type { RouteLocationRaw } from 'vue-router'
import { useModalStore } from '@stores/appStore'

const getStores = (): { modal: ReturnType<typeof useModalStore> } => ({
  modal: useModalStore(),
})

const isOpen = ref(false)
const message = ref('')
const confirmEvent = ref<(() => void) | null>(null)
const backToEvent = ref<RouteLocationRaw | null>(null)

// prettier-ignore
export const useDeletePrompt = (): { isOpen: typeof isOpen; message: typeof message; open: (messageText: string, apiRequest: () => Promise<void>, backRoute: RouteLocationRaw) => void; confirm: () => Promise<void>; close: () => void } => {
  const { modal } = getStores()

  const open = (messageText: string, apiRequest: () => Promise<void>, backRoute: RouteLocationRaw) => {
    message.value = messageText
    confirmEvent.value = apiRequest
    backToEvent.value = backRoute
    isOpen.value = true
  }

  const confirm = async () => {
    await confirmEvent.value?.()
    isOpen.value = false
    modal.isOpen = false
    if (backToEvent.value) {
      router.push(backToEvent.value)
    }
    close()
  }

  const close = () => {
    isOpen.value = false
    confirmEvent.value = null
    backToEvent.value = null
  }

  return { isOpen, message, open, confirm, close }
}
