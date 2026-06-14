import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

let isReady = false

export const setRouterReady = () => {
  isReady = true
}

router.beforeEach((to) => {
  if (!isReady) return

  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }
})

export default router
