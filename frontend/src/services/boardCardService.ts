import type { BoardColumnType, BoardCardType } from '@shared/schemas/board'
import { useModalStore } from '@stores/appStore.ts'
import { useBoardStore } from '@stores/boardStore.ts'

const getStores = () => ({
  board: useBoardStore(),
  modal: useModalStore(),
})

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

  board.columns = board.columns.map((column: BoardColumnType) => {
    if (column.id === cardId[0]) {
      return {
        ...column,
        cards: column.cards.filter((card: BoardCardType) => card.id !== cardId[1]),
      }
    }
    return column
  })
}

export const updateCard = (cardId: [number, number], updates: Partial<BoardCardType>) => {
  const { board } = getStores()

  board.columns = board.columns.map((column: BoardColumnType) => {
    if (column.id === cardId[0]) {
      return {
        ...column,
        cards: column.cards.map((card: BoardCardType) => (card.id === cardId[1] ? { ...card, ...updates } : card)),
      }
    }
    return column
  })
}
