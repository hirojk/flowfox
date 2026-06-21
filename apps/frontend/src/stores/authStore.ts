import axios from 'axios'
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
      const response = await api.post('/api/auth/login', { username, password })

      if (response.data?.sessionToken) {
        localStorage.setItem('sessionToken', response.data.sessionToken)
      }

      await this.fetchUser()
    },

    async fetchUser(): Promise<void> {
      try {
        const response = await api.get('/api/v1/users/me')
        this.user = response.data
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          console.error('fetch user session error:', error)
        }
        this.user = null
      }
    },

    async logout(): Promise<void> {
      await api.post('/api/auth/logout')
      localStorage.removeItem('sessionToken')
      this.user = null
    },
  },
})
