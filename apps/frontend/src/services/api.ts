import axios from 'axios'

const API_URL = import.meta.env.API_URL || 'http://localhost:5000'
const isDebugEnv = import.meta.env.APP_ENV === 'development' || import.meta.env.APP_ENV === 'staging'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (isDebugEnv && error.response?.status !== 401) {
      console.error('API Error:', error.response?.data || error.message)
    }
    return Promise.reject(error)
  },
)

export default api
