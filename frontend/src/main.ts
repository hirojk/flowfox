import { checkTestAuth } from '@services/authService.ts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'
import '@/styles/app.scss'

import { registerGlobalComponents } from './global.components.ts'

checkTestAuth().then((authenticated) => {
  if (!authenticated) return

  const app = createApp(App)
  registerGlobalComponents(app)
  app.use(createPinia()).use(Quasar).use(router).mount('#app')
})
