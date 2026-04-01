import { useAppStore } from '@stores/appStore'
import type { ModalWindowType } from '@typeDefs/globalTypes'

const getStores = (): { modal: ReturnType<typeof useAppStore> } => ({
  modal: useAppStore(),
})

export const openSettingsModal = (currentWindowString: ModalWindowType): void => {
  const { modal } = getStores()

  modal.isModalOpen = true
  modal.modalContent = currentWindowString
}
