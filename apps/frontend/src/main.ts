import { checkTestAuth } from '@services/authService.ts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router, { setRouterReady } from './router'
import '@styles/app.scss'

import { registerGlobalComponents } from './global.components.ts'
import { useAuthStore } from '@stores/authStore'

checkTestAuth().then(async (authenticated) => {
  if (!authenticated) return

  const app = createApp(App)
  const pinia = createPinia()

  registerGlobalComponents(app)
  app.use(pinia).use(Quasar).use(router)

  await useAuthStore().fetchUser()
  setRouterReady()

  app.mount('#app')
})
