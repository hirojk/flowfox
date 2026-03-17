import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './router'
import '@/styles/app.scss'

import { registerGlobalComponents } from './global.components.ts'

const checkTestAuth = () => {
  if (import.meta.env.NODE_ENV !== 'development') return

  if (sessionStorage.getItem('testAuth') === 'true') return

  const password = window.prompt('Development Environment\n\nPassword:')

  if (password === import.meta.env.DEV_PASS) {
    sessionStorage.setItem('testAuth', 'true')
    return
  }

  window.alert('Invalid password!')
  checkTestAuth()
}
checkTestAuth()

const app = createApp(App)

registerGlobalComponents(app)

app.use(createPinia()).use(Quasar).use(router).mount('#app')
