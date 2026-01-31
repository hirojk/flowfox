import type { BoardColumnType } from 'src/types/boardType';

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    columnName: 'New Column',
    cards: [],
    ...overrides,
  };
};

export const addColumnEvent = (currentColumns: BoardColumnType[]) => {
  return currentColumns.push(createNewColumn());
};

export const removeColumnEvent = (currentColumns: BoardColumnType[], ColumnId: number) => {
  return currentColumns.filter((column) => column.id !== ColumnId);
};
