import { defineStore } from 'pinia'
import type { ModalWindowType } from '@typeDefs/globalTypes'

export const useAppStore = defineStore('app', {
  state: () => ({
    isSidebarOpen: false as boolean,
  }),
})

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false as boolean,
    currentWindow: null as ModalWindowType | null,
  }),
})
