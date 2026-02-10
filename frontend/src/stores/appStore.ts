import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false as boolean,
  }),

  actions: {
    openModal(): void {
      this.isOpen = true
    },
    closeModal(): void {
      this.isOpen = false
    },
  },
})
