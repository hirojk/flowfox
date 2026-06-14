import { useAppStore } from '@stores/appStore'
import type { ModalUIType } from '@typeDefs/globalTypes'

const getModal = (): HTMLDialogElement | null => document.querySelector('.modal')

export const openSettingsModal = (content: ModalUIType): void => {
  const store = useAppStore()

  store.isModalOpen = true
  store.modalContent = content

  getModal()?.showModal()

  requestAnimationFrame(() => {
    ;(document.activeElement as HTMLElement | null)?.blur()
  })
}

export const closeSettingsModal = (): void => {
  const store = useAppStore()

  if (store.isEditing || store.isDropdownOpen) return

  store.isModalOpen = false
  store.modalContent = null

  getModal()?.close()
}
