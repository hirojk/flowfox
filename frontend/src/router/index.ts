import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

const history =
  import.meta.env.VITE_ROUTER_MODE === 'history'
    ? createWebHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
