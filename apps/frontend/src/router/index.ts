import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

let resolveReady: () => void
const readyPromise = new Promise<void>((resolve) => {
  resolveReady = resolve
})

export const setRouterReady = () => {
  resolveReady()
}

router.beforeEach(async (to) => {
  await readyPromise

  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }
})

export default router
