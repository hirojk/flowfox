import { BoardColumnSchema } from '@flowfox/shared'
import type { BoardColumnType } from '@flowfox/shared'
import { useBoardStore } from '@stores/boardStore.ts'
import { generateId } from '@flowfox/shared'

const getStores = () => ({
  board: useBoardStore(),
})

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return BoardColumnSchema.parse({
    id: generateId(),
    ...overrides,
  })
}

export const addColumn = () => {
  const { board } = getStores()

  if (board.activeBoard) {
    board.activeBoard.columns.push(createNewColumn())
    board.updateBoard()
  }
}

export const removeColumn = (columnId: number) => {
  const { board } = getStores()

  if (board.activeBoard) {
    board.activeBoard.columns = board.activeBoard.columns.filter((column: BoardColumnType) => column.id !== columnId)
    board.updateBoard()
  }
}

export const renameColumn = (columnId: number, newName: string) => {
  const { board } = getStores()
  const selectedColumn = board.activeBoard?.columns.find((column: BoardColumnType) => column.id === columnId)

  if (selectedColumn) {
    selectedColumn.name = newName
    board.updateBoard()
  }
}
