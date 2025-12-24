import { defineStore } from 'pinia';
import type { KanbanColumnType } from 'src/types/boardType';

export const useBoardStore = defineStore('board', {
  state: () => ({
    projectName: '' as string,
    columns: [] as Array<KanbanColumnType>,
  }),

  actions: {
    async initData(): Promise<void> {
      try {
        const response = await fetch('/src/assets/test.json');
        const data = await response.json();

        this.projectName = data.projectName;

        if (Array.isArray(data.columns)) {
          this.columns = data.columns as KanbanColumnType[];
        }
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },
  },
});
