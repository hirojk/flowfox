import type { BoardColumnType } from 'src/types/boardType';
import { useBoardStore } from 'src/stores/boardStore';

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    columnName: 'New Column',
    cards: [],
    ...overrides,
  };
};

export const addColumnEvent = () => {
  useBoardStore().columns.push(createNewColumn());
};

export const removeColumnEvent = (columnId: number) => {
  useBoardStore().columns = useBoardStore().columns.filter((column) => column.id !== columnId);
};
