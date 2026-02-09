import { ref, onMounted, onUnmounted } from 'vue';

export const useDragScroll = (querySelector?: string) => {
  const scrollContainer = ref<HTMLElement | null>(null);

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const startDrag = (e: MouseEvent) => {
    if (!scrollContainer.value) return;
    isDragging = true;

    startX = e.pageX - scrollContainer.value.offsetLeft;
    scrollLeft = scrollContainer.value.scrollLeft;
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !scrollContainer.value) return;
    e.preventDefault();

    const x = e.pageX - scrollContainer.value.offsetLeft;
    const walk = (x - startX) * 1.25;
    scrollContainer.value.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    if (!scrollContainer.value) return;
    isDragging = false;
  };

  onMounted(() => {
    if (querySelector) {
      scrollContainer.value = document.querySelector(querySelector);
    }

    if (scrollContainer.value) {
      scrollContainer.value.style.userSelect = 'none';
      scrollContainer.value.addEventListener('mousedown', startDrag);
      scrollContainer.value.addEventListener('mousemove', onDrag);
      scrollContainer.value.addEventListener('mouseup', stopDrag);
      scrollContainer.value.addEventListener('mouseleave', stopDrag);
    }
  });

  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('mousedown', startDrag);
      scrollContainer.value.removeEventListener('mousemove', onDrag);
      scrollContainer.value.removeEventListener('mouseup', stopDrag);
      scrollContainer.value.removeEventListener('mouseleave', stopDrag);
    }
  });

  return { scrollContainer };
};
