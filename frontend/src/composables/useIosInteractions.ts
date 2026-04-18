import { nextTick } from 'vue'

export const focusAfterAsync = async (asyncFn: () => Promise<void>, selector: string) => {
  const tempInput = document.createElement('input')
  tempInput.style.cssText = 'position:fixed;opacity:0;pointer-events:none;'
  document.body.appendChild(tempInput)
  tempInput.focus()

  await asyncFn()
  await nextTick()

  document.querySelector<HTMLElement>(selector)?.focus()
  tempInput.remove()
}
