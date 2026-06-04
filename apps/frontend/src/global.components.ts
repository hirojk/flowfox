import type { App } from 'vue/dist/vue.js'

import LineDivider from '@components/decoration/LineDivider.vue'
import IconSvg from '@components/ui/IconSvg.vue'
import ModalUI from '@components/ui/ModalUI.vue'
import ButtonUI from '@components/ui/ButtonUI.vue'
import IconButtonUI from '@components/ui/IconButtonUI.vue'
import SelectMenuUI from '@components/ui/SelectMenuUI.vue'
import LinkUI from '@components/ui/LinkUI.vue'
import DropdownUI from '@components/ui/DropdownUI.vue'
import DeletePrompt from '@components/DeletePrompt.vue'

export function registerGlobalComponents(app: App) {
  app.component('LineDivider', LineDivider)
  app.component('IconSvg', IconSvg)
  app.component('ModalUI', ModalUI)
  app.component('ButtonUI', ButtonUI)
  app.component('IconButtonUI', IconButtonUI)
  app.component('LinkUI', LinkUI)
  app.component('DropdownUI', DropdownUI)
  app.component('DeletePrompt', DeletePrompt)
  app.component('SelectMenuUI', SelectMenuUI)
}
