import { defineStore } from 'pinia'
import api from '@services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const response = await api.post('/api/auth/login', { username, password })

      this.token = response.data.accessToken
      sessionStorage.setItem('token', response.data.accessToken)
    },

    logout(): void {
      this.token = null
      sessionStorage.removeItem('token')
    },
  },
})
