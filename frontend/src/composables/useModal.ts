import { useModalStore } from '@stores/appStore'
import type { ModalWindowType } from '@typeDefs/globalTypes'

const getStores = (): { modal: ReturnType<typeof useModalStore> } => ({
  modal: useModalStore(),
})

export const openSettingsModal = (currentWindowString: ModalWindowType): void => {
  const { modal } = getStores()

  modal.isOpen = true
  modal.currentWindow = currentWindowString
}
