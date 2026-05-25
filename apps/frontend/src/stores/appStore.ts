import { defineStore } from 'pinia'
import type { ModalUIType } from '@typeDefs/globalTypes'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarOpen: false as boolean,
    isEditing: false as boolean,
    isDropdownOpen: false as boolean,
    currentEditingId: null as number | null,

    isModalOpen: false as boolean,
    modalContent: null as ModalUIType | null,

    justDropped: false as boolean,
  }),
})
