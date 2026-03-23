import type { App } from 'vue/dist/vue.js'

import IconSvg from '@components/IconSvg.vue'
import ModalWindow from '@components/ModalWindow.vue'
import DropdownMenu from '@components/DropdownMenu.vue'

export function registerGlobalComponents(app: App) {
  app.component('IconSvg', IconSvg)
  app.component('ModalWindow', ModalWindow)
  app.component('DropdownMenu', DropdownMenu)
}
