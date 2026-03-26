import { BoardCardSchema } from '@flowfox/shared'
import type { BoardColumnType, BoardCardType } from '@flowfox/shared'
import { useModalStore } from '@stores/appStore.ts'
import { useBoardStore } from '@stores/boardStore.ts'
import { generateId } from '@flowfox/shared'

const getStores = () => ({
  board: useBoardStore(),
  modal: useModalStore(),
})

export const createNewCard = (overrides: Partial<BoardCardType> = {}): BoardCardType => {
  return BoardCardSchema.parse({
    id: generateId(),
    startDate: new Date(),
    deadline: new Date(),
    ...overrides,
  })
}

export const addCard = (currentCards: BoardCardType[]) => {
  const { board } = getStores()

  currentCards.push(createNewCard())
  board.updateBoard(board.activeBoard?.id!)
}

export const removeCard = (cardId: [number, number]) => {
  const { board, modal } = getStores()

  if (modal.isOpen) {
    modal.isOpen = false
  }

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

    board.updateBoard(board.activeBoard?.id!)
  }
}

export const updateCard = (cardId: [number, number], updates: Partial<BoardCardType>) => {
  const { board } = getStores()

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

    board.updateBoard(board.activeBoard?.id!)
  }
}
