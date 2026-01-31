import type { BoardCardType } from 'src/types/boardType';

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

export const removeCardEvent = (currentCards: BoardCardType[], CardId: number) => {
  return currentCards.filter((card) => card.id !== CardId);
};
