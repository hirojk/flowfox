import { defineStore } from 'pinia';
import type { BoardColumnType } from 'src/types/boardType';

export const useBoardStore = defineStore('board', {
  state: () => ({
    projectName: '' as string,
    columns: [] as Array<BoardColumnType>,
    activeCardId: [] as Array<number>,
  }),

  actions: {
    async initData(): Promise<void> {
      try {
        const response = await fetch('/src/assets/test.json');
        const data = await response.json();

        this.projectName = data.projectName;

        if (Array.isArray(data.columns)) {
          this.columns = data.columns as BoardColumnType[];
        }
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },
    setActiveCardId(columnId: number, cardId: number): void {
      this.activeCardId = [columnId, cardId];
    },
  },
});
