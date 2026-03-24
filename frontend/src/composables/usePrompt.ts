import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
const onConfirmCallback = ref<(() => void) | null>(null)

export const useDeletePrompt = () => {
  const open = (text: string) => {
    message.value = text
    // onConfirmCallback.value = onConfirm
    isOpen.value = true
  }

  const confirm = () => {
    onConfirmCallback.value?.()
    close()
  }

  const close = () => {
    isOpen.value = false
    onConfirmCallback.value = null
  }

  return { isOpen, message, open, confirm, close }
}
