import { defineBoot } from '#q-app/wrappers';
import IconSvg from 'src/components/IconSvg.vue';

export default defineBoot(({ app }) => {
  app.component('IconSvg', IconSvg);
});
