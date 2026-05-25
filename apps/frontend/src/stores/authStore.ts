import { defineStore } from 'pinia'
import api from '@services/api'
import { jwtDecode } from 'jwt-decode'
import type { UserType } from '@pagewise/shared'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userToken: sessionStorage.getItem('userToken') as string | null,
  }),

  getters: {
    activeUser: (state) => {
      if (!state.userToken) return null
      return jwtDecode<Omit<UserType, 'password'>>(state.userToken)
    },
    isLoggedIn: (state) => !!state.userToken,
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      const response = await api.post('/api/auth/login', { username, password })

      this.userToken = response.data.userToken
      sessionStorage.setItem('userToken', response.data.userToken)
    },

    logout(): void {
      this.userToken = null
      sessionStorage.removeItem('userToken')
    },
  },
})
