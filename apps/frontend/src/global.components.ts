import type { App } from 'vue/dist/vue.js'

import IconSvg from '@components/IconSvg.vue'
import ModalWindow from '@components/ModalWindow.vue'
import ButtonUI from '@components/ui/ButtonUI.vue'
import DropdownMenu from '@components/DropdownMenu.vue'
import DeletePrompt from '@components/DeletePrompt.vue'

export function registerGlobalComponents(app: App) {
  app.component('IconSvg', IconSvg)
  app.component('ModalWindow', ModalWindow)
  app.component('ButtonUI', ButtonUI)
  app.component('DropdownMenu', DropdownMenu)
  app.component('DeletePrompt', DeletePrompt)
}
