import { nextTick } from 'vue'

export const triggerInputFocus = async (asyncFn: () => Promise<void>, selector: string) => {
  const tempInput = document.createElement('input')
  tempInput.style.cssText = 'position:fixed;opacity:0;'
  document.body.appendChild(tempInput)
  tempInput.focus()

  await asyncFn()
  await nextTick()

  const realInput = document.querySelector<HTMLInputElement>(selector)
  if (realInput) {
    realInput.removeAttribute('readonly')
    realInput.focus()
  }

  tempInput.remove()
}
