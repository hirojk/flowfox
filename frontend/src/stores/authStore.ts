import { defineStore } from 'pinia'
import api from '@services/api'
import { jwtDecode } from 'jwt-decode'
import type { UserType } from '@flowfox/shared'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') as string | null,
  }),

  getters: {
    activeUser: (state) => {
      if (!state.token) return null
      return jwtDecode<Omit<UserType, 'password'>>(state.token)
    },
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const response = await api.post('/api/auth/login', { username, password })

      this.token = response.data.token
      sessionStorage.setItem('token', response.data.token)
    },

    logout(): void {
      this.token = null
      sessionStorage.removeItem('token')
    },
  },
})
