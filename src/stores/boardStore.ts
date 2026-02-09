import { defineStore } from 'pinia';
import type { BoardColumnType, BoardCardType } from 'src/types/boardType';
import { sortedCardsByPriority } from 'src/constants/priority';

export const useBoardStore = defineStore('board', {
  state: () => ({
    projectName: '' as string,
    columns: [] as Array<BoardColumnType>,
    activeCardId: [0, 0] as [number, number],
  }),

  actions: {
    async initData(): Promise<void> {
      try {
        const response = await fetch('/src/assets/test.json');
        const data = await response.json();

        this.projectName = data.projectName;

        if (Array.isArray(data.columns)) {
          this.columns = data.columns.map((colum: BoardColumnType) => {
            const convertedCards = colum.cards.map((card: BoardCardType) => ({
              ...card,
              startDate: new Date(card.startDate),
              deadline: new Date(card.deadline),
            }));

            return {
              ...colum,
              cards: sortedCardsByPriority(convertedCards),
            };
          });
        }
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },
    updateProjektName(name: string): void {
      this.projectName = name;
    },
    setActiveCardId(columnId: number, cardId: number): void {
      this.activeCardId = [columnId, cardId];
    },
  },
});
