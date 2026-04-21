import { defineStore } from 'pinia'
import type { ModalWindowType } from '@typeDefs/globalTypes'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarOpen: false as boolean,
    isEditing: false as boolean,
    isDropdownOpen: false as boolean,
    currentEditingId: null as number | null,

    isModalOpen: false as boolean,
    modalContent: null as ModalWindowType | null,
  }),
})
