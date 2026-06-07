import { ref, onMounted, type Ref } from 'vue'

const LINE_HEIGHT = 80

export function useDecorationLines(contentRef: Ref<HTMLElement | null>) {
  const dividerCount = ref(10)

  const calculateDividerCount = () => {
    if (!contentRef.value) return
    const contentHeight = contentRef.value.scrollHeight
    dividerCount.value = Math.max(1, Math.ceil(contentHeight / LINE_HEIGHT))
  }

  onMounted(() => {
    if (contentRef.value) {
      calculateDividerCount()
      const observer = new ResizeObserver(() => calculateDividerCount())
      observer.observe(contentRef.value)
    }
  })

  return {
    dividerCount,
  }
}
