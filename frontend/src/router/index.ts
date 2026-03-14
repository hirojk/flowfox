import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@stores/authStore'
import routes from './routes.js'

const history =
  import.meta.env.VITE_ROUTER_MODE === 'history'
    ? createWebHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  } else if (to.name === 'login' && authStore.isLoggedIn) {
    return { name: 'board', params: { projectId: '97649491' } }
  } else {
    return true
  }
})

export default router
