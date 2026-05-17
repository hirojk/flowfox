import { useBoardStore } from '@stores/boardStore'
import { useAppStore } from '@stores/appStore'
// prettier-ignore
import { BoardColumnSchema, BoardCardSchema, generateId, type BoardColumnType, type BoardCardType } from '@flowfox/shared'

const getStores = (): { board: ReturnType<typeof useBoardStore>; modal: ReturnType<typeof useAppStore> } => ({
  board: useBoardStore(),
  modal: useAppStore(),
})

/**
 * Manages column operations on the active board.
 * Syncs all changes to the global board store and persists them via API.
 */
export const useBoardColumn = (): {
  addColumn: () => BoardColumnType | undefined
  removeColumn: (columnId: number) => void
  renameColumn: (columnId: number, newName: string) => void
  createNewColumn: (overrides: Partial<BoardColumnType>) => BoardColumnType
} => {
  const { board } = getStores()

  const createNewColumn = (overrides: Partial<BoardColumnType> = {}): BoardColumnType => {
    return BoardColumnSchema.parse({
      id: generateId(),
      ...overrides,
    })
  }

  const addColumn = (): BoardColumnType | undefined => {
    if (!board.activeBoard) return
    const newColumn = createNewColumn()
    board.activeBoard.columns.push(newColumn)
    board.updateBoard(board.activeBoard.id)
    return newColumn
  }

  const removeColumn = (columnId: number): void => {
    if (!board.activeBoard) return
    board.activeBoard.columns = board.activeBoard.columns.filter((column: BoardColumnType) => column.id !== columnId)
    board.updateBoard(board.activeBoard.id)
  }

  const renameColumn = (columnId: number, newName: string): void => {
    const column = board.activeBoard?.columns.find((column: BoardColumnType) => column.id === columnId)
    if (column) {
      column.name = newName
      board.updateBoard(board.activeBoard!.id)
    }
  }

  return { addColumn, removeColumn, renameColumn, createNewColumn }
}

/**
 * Manages card operations on the active board.
 * Syncs all changes to the global board store and persists them via API.
 */
export const useBoardCard = (): {
  addCard: (currentCards: BoardCardType[]) => BoardCardType
  removeCard: (cardId: [number, number]) => void
  updateCard: (cardId: [number, number], updates: Partial<BoardCardType>) => void
  createNewCard: (overrides: Partial<BoardCardType>) => BoardCardType
} => {
  const { board, modal } = getStores()

  const createNewCard = (overrides: Partial<BoardCardType> = {}): BoardCardType => {
    return BoardCardSchema.parse({
      id: generateId(),
      startDate: new Date(),
      deadline: new Date(),
      ...overrides,
    })
  }

  const addCard = (currentCards: BoardCardType[]): BoardCardType => {
    const newCard = createNewCard()
    currentCards.push(newCard)
    return newCard
  }

  const removeCard = (cardId: [number, number]): void => {
    if (modal.isModalOpen) modal.isModalOpen = false

    if (board.activeBoard) {
      board.activeBoard.columns = board.activeBoard.columns.map((column: BoardColumnType) => {
        if (column.id === cardId[0]) {
          return {
            ...column,
            cards: column.cards.filter((card: BoardCardType) => card.id !== cardId[1]),
          }
        }
        return column
      })
      board.updateBoard(board.activeBoard.id)
    }
  }

  const updateCard = (cardId: [number, number], updates: Partial<BoardCardType>): void => {
    if (board.activeBoard) {
      board.activeBoard.columns = board.activeBoard.columns.map((column: BoardColumnType) => {
        if (column.id === cardId[0]) {
          return {
            ...column,
            cards: column.cards.map((card: BoardCardType) => (card.id === cardId[1] ? { ...card, ...updates } : card)),
          }
        }
        return column
      })
      board.updateBoard(board.activeBoard.id)
    }
  }

  return { addCard, removeCard, updateCard, createNewCard }
}
