import { defineStore } from 'pinia'
import api from '@services/api'
import type { UserType } from '@pagewise/shared'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserType | null,
  }),

  getters: {
    activeUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      await api.post('/api/auth/login', { username, password })
      await this.fetchUser()
    },

    async fetchUser(): Promise<void> {
      try {
        const response = await api.get('/api/v1/users/me')
        this.user = response.data
      } catch {
        this.user = null
      }
    },

    async logout(): Promise<void> {
      await api.post('/api/auth/logout')
      this.user = null
    },
  },
})
