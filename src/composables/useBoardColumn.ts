import type { BoardColumnType } from 'src/types/boardType';
import { useBoardStore } from 'src/stores/boardStore';

const getStores = () => ({
  board: useBoardStore(),
});

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    columnName: 'New Column',
    cards: [],
    ...overrides,
  };
};

export const addColumnEvent = () => {
  const { board } = getStores();

  board.columns.push(createNewColumn());
};

export const removeColumnEvent = (columnId: number) => {
  const { board } = getStores();

  board.columns = board.columns.filter((column) => column.id !== columnId);
};

export const renameColumnEvent = (columnId: number, newName: string) => {
  const { board } = getStores();
  const column = board.columns.find((column) => column.id === columnId);

  if (column) {
    column.columnName = newName;
  }
};
