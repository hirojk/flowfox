import { defineBoot } from '#q-app/wrappers';
import IconSvg from 'src/components/IconSvg.vue';
import ModalWindow from 'src/components/ModalWindow.vue';
import ContextMenu from 'src/components/ContextMenu.vue';

export default defineBoot(({ app }) => {
  app.component('IconSvg', IconSvg);
  app.component('ModalWindow', ModalWindow);
  app.component('ContextMenu', ContextMenu);
});
