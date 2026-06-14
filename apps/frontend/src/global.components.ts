import type { App } from 'vue/dist/vue.js'

import LineDivider from '@components/decoration/LineDivider.vue'
import BreadcrumbsUI from '@components/ui/BreadcrumbsUI.vue'
import ButtonUI from '@components/ui/ButtonUI.vue'
import DropdownUI from '@components/ui/DropdownUI.vue'
import IconButtonUI from '@components/ui/IconButtonUI.vue'
import IconSvg from '@components/IconSvg.vue'
import InitialUI from '@components/ui/InitialUI.vue'
import LinkUI from '@components/ui/LinkUI.vue'
import ModalUI from '@components/ui/ModalUI.vue'
import SelectMenuUI from '@components/ui/SelectMenuUI.vue'
import DeletePrompt from '@components/DeletePrompt.vue'

export function registerGlobalComponents(app: App) {
  app.component('LineDivider', LineDivider)
  app.component('BreadcrumbsUI', BreadcrumbsUI)
  app.component('ButtonUI', ButtonUI)
  app.component('DropdownUI', DropdownUI)
  app.component('IconButtonUI', IconButtonUI)
  app.component('IconSvg', IconSvg)
  app.component('InitialUI', InitialUI)
  app.component('LinkUI', LinkUI)
  app.component('ModalUI', ModalUI)
  app.component('SelectMenuUI', SelectMenuUI)
  app.component('DeletePrompt', DeletePrompt)
}
