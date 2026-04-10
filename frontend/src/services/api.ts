import axios from 'axios'

const API_URL = import.meta.env.API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('userToken')

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.data || error.message)
    }
    return Promise.reject(error)
  },
)

export default api
