import type { BoardColumnType, BoardCardType } from '@shared/schemas/boardSchema'
import { useModalStore } from '@stores/appStore.ts'
import { useBoardStore } from '@stores/boardStore.ts'
import { generateId } from '@shared/utils/idGenerator'

const getStores = () => ({
  board: useBoardStore(),
  modal: useModalStore(),
})

export const createNewCard = (overrides: Partial<BoardCardType> = {}): BoardCardType => {
  return {
    id: generateId(),
    taskName: 'New Task',
    priority: 'Medium',
    description: 'No Description',
    checklist: [],
    startDate: new Date(),
    deadline: new Date(),
    tags: [],
    ...overrides,
  }
}

export const addCard = (currentCards: BoardCardType[]) => {
  return currentCards.push(createNewCard())
}

export const removeCard = (cardId: [number, number]) => {
  const { board, modal } = getStores()

  if (modal.isOpen) {
    modal.closeModal()
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
  }
}
