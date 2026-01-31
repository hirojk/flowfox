import type { BoardCardType } from 'src/types/boardType';
import { useModalStore } from 'src/stores/appStore';
import { useBoardStore } from 'src/stores/boardStore';

export const createNewCard = (overrides: Partial<BoardCardType> = {}): BoardCardType => {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    taskName: 'New Task',
    priority: 'Medium',
    description: 'No Description',
    checklist: [],
    startDate: new Date(),
    deadline: new Date(),
    tags: [],
    ...overrides,
  };
};

export const addCardEvent = (currentCards: BoardCardType[]) => {
  return currentCards.push(createNewCard());
};

export const removeCardEvent = (cardId: [number, number]) => {
  if (useModalStore().isOpen) {
    useModalStore().closeModal();
  }

  useBoardStore().columns = useBoardStore().columns.map((column) => {
    if (column.id === cardId[0]) {
      return {
        ...column,
        cards: column.cards.filter((card) => card.id !== cardId[1]),
      };
    }
    return column;
  });
};
