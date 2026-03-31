import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const interactionState: Ref<'grabbing' | 'dragging' | undefined> = ref(undefined)

export const useGrabElement = (listRef: Ref<HTMLElement | null>, saveUpdatedStore: (newOrder: number[]) => void) => {
  let grabbingElement: HTMLElement | null = null
  let ghost: HTMLElement | null = null

  const holdingTime = 1000

  const moveGhost = (x: number, y: number) => {
    if (!ghost) return
    ghost.style.left = `${x - Number(ghost.dataset.offsetX)}px`
    ghost.style.top = `${y - Number(ghost.dataset.offsetY)}px`
  }

  const removeGhost = () => {
    ghost?.remove()
    ghost = null
    grabbingElement = null
    document.body.style.cursor = ''
  }

  // prettier-ignore
  const createGhost = (htmlElement: HTMLElement, width: number, height: number, x: number, y: number, offsetX: number, offsetY: number) => {
    const element = htmlElement.cloneNode(true) as HTMLElement
    element.classList.add('grab-ghost')
    element.style.width = `${width}px`
    element.style.height = `${height}px`
    element.style.left = `${x - offsetX}px`
    element.style.top = `${y - offsetY}px`
    element.dataset.offsetX = String(offsetX)
    element.dataset.offsetY = String(offsetY)
    document.body.appendChild(element)

    return element
  }

  const createPlaceholder = (width: number, height: number) => {
    const element = document.createElement('li')
    element.classList.add('grab-placeholder')
    element.style.width = `${width}px`
    element.style.height = `${height}px`

    return element
  }

  const onMouseDown = (e: MouseEvent) => {
    const columnElement = (e.target as HTMLElement).closest('.draggable') as HTMLElement | null
    if (!columnElement || !listRef.value) return
    if (interactionState.value === 'dragging') return

    interactionState.value = 'grabbing'

    const startDrag = () => {
      grabbingElement = columnElement
      columnElement.removeEventListener('mouseleave', cancelHold)

      const { left, top, width, height } = columnElement.getBoundingClientRect()
      ghost = createGhost(columnElement, width, height, e.clientX, e.clientY, e.clientX - left, e.clientY - top)

      columnElement.replaceWith(createPlaceholder(width, height))
      document.body.style.cursor = 'grabbing'
    }

    const cancelHold = () => {
      clearTimeout(holdTimer)
      if (!ghost) {
        interactionState.value = undefined
      }
      window.removeEventListener('mouseup', cancelHold)
    }

    const holdTimer = setTimeout(startDrag, holdingTime)

    columnElement.addEventListener('mouseleave', cancelHold)
    window.addEventListener('mouseup', cancelHold)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!ghost || !listRef.value) return
    moveGhost(e.clientX, e.clientY)

    const placeholder = listRef.value.querySelector('.grab-placeholder') as HTMLElement | null
    if (!placeholder) return

    const listColumns = [...listRef.value.querySelectorAll('.draggable')] as HTMLElement[]

    for (const column of listColumns) {
      const rect = column.getBoundingClientRect()

      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        if (e.clientX > rect.right - rect.width / 3) {
          column.before(placeholder)
        } else if (e.clientX < rect.left + rect.width / 3) {
          column.after(placeholder)
        }
        break
      }
    }
  }

  const onMouseUp = () => {
    if (!ghost || !listRef.value) return

    listRef.value?.querySelector('.grab-placeholder')?.replaceWith(grabbingElement!)
    removeGhost()
    interactionState.value = undefined

    const newOrder = [...listRef.value.querySelectorAll('.draggable')].map((el) =>
      Number((el as HTMLElement).dataset.id),
    )

    saveUpdatedStore(newOrder)
  }

  watch(listRef, (listElement) => {
    if (!listElement) return
    listElement.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  })

  onUnmounted(() => {
    listRef.value?.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    removeGhost()
  })
}

export const useDragScroll = (querySelector?: string) => {
  const scrollContainer = ref<HTMLElement | null>(null)

  let isDragging = false
  let startX = 0
  let scrollLeft = 0

  const startDrag = (e: MouseEvent) => {
    if (!scrollContainer.value) return
    if (interactionState.value === 'grabbing') return

    interactionState.value = 'dragging'
    isDragging = true

    startX = e.pageX - scrollContainer.value.offsetLeft
    scrollLeft = scrollContainer.value.scrollLeft
  }

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !scrollContainer.value) return
    if (interactionState.value === 'grabbing') {
      isDragging = false
      return
    }
    e.preventDefault()

    const x = e.pageX - scrollContainer.value.offsetLeft
    const walk = (x - startX) * 1.25
    scrollContainer.value.scrollLeft = scrollLeft - walk
  }

  const stopDrag = () => {
    if (!scrollContainer.value) return

    interactionState.value = undefined
    isDragging = false
  }

  onMounted(() => {
    if (querySelector) {
      scrollContainer.value = document.querySelector(querySelector)
    }

    if (scrollContainer.value) {
      scrollContainer.value.style.userSelect = 'none'
      scrollContainer.value.addEventListener('mousedown', startDrag)
      scrollContainer.value.addEventListener('mousemove', onDrag)
      scrollContainer.value.addEventListener('mouseup', stopDrag)
      scrollContainer.value.addEventListener('mouseleave', stopDrag)
    }
  })

  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('mousedown', startDrag)
      scrollContainer.value.removeEventListener('mousemove', onDrag)
      scrollContainer.value.removeEventListener('mouseup', stopDrag)
      scrollContainer.value.removeEventListener('mouseleave', stopDrag)
    }
  })

  return { scrollContainer }
}
