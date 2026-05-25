import type { App } from 'vue/dist/vue.js'

import IconSvg from '@components/ui/IconSvg.vue'
import ModalUI from '@components/ui/ModalUI.vue'
import ButtonUI from '@components/ui/ButtonUI.vue'
import DropdownUI from '@components/ui/DropdownUI.vue'
import DeletePrompt from '@components/DeletePrompt.vue'

export function registerGlobalComponents(app: App) {
  app.component('IconSvg', IconSvg)
  app.component('ModalUI', ModalUI)
  app.component('ButtonUI', ButtonUI)
  app.component('DropdownUI', DropdownUI)
  app.component('DeletePrompt', DeletePrompt)
}
