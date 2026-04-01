import { useBoardStore } from '@stores/boardStore'
import { BoardColumnSchema, generateId, type BoardColumnType } from '@flowfox/shared'

const getStores = (): { board: ReturnType<typeof useBoardStore> } => ({
  board: useBoardStore(),
})

export const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
  return BoardColumnSchema.parse({
    id: generateId(),
    ...overrides,
  })
}

export const addColumn = (): void => {
  const { board } = getStores()
  if (!board.activeBoard) return

  if (board.activeBoard) {
    board.activeBoard.columns.push(createNewColumn())
    board.updateBoard(board.activeBoard!.id)
  }
}

export const removeColumn = (columnId: number): void => {
  const { board } = getStores()

  if (board.activeBoard) {
    board.activeBoard.columns = board.activeBoard.columns.filter((column: BoardColumnType) => column.id !== columnId)
    board.updateBoard(board.activeBoard!.id)
  }
}

export const renameColumn = (columnId: number, newName: string): void => {
  const { board } = getStores()
  const selectedColumn = board.activeBoard?.columns.find((column: BoardColumnType) => column.id === columnId)

  if (selectedColumn) {
    selectedColumn.name = newName
    board.updateBoard(board.activeBoard!.id)
  }
}
