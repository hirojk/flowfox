import { useModalStore } from '@stores/appStore'
import type { ModalWindowType } from '@typeDefs/globalTypes'

const getStores = () => ({
  modal: useModalStore(),
})

export const openSettingsModal = (currentWindowString: ModalWindowType) => {
  const { modal } = getStores()

  modal.isOpen = true
  modal.currentWindow = currentWindowString
}
