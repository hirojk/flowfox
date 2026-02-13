import type { BoardColumnType } from '@shared/schemas/board'
import { useBoardStore } from '@stores/boardStore.ts'

const getStores = () => ({
  board: useBoardStore(),
})

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    columnName: 'New Column',
    cards: [],
    ...overrides,
  }
}

export const addColumn = () => {
  const { board } = getStores()

  board.columns.push(createNewColumn())
}

export const removeColumn = (columnId: number) => {
  const { board } = getStores()

  board.columns = board.columns.filter((column: BoardColumnType) => column.id !== columnId)
}

export const renameColumn = (columnId: number, newName: string) => {
  const { board } = getStores()
  const column = board.columns.find((column: BoardColumnType) => column.id === columnId)

  if (column) {
    column.columnName = newName
  }
}
