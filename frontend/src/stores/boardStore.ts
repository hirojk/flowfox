import { defineStore } from 'pinia'
import type { BoardType, BoardColumnType, BoardCardType } from '@shared/schemas/boardSchema'
import { sortedCardsByPriority } from '@constants/priority.ts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useBoardStore = defineStore('board', {
  state: () => ({
    activeBoard: null as BoardType | null,
    activeCardId: [0, 0] as [number, number],
  }),

  actions: {
    async loadBoard(projectId: number): Promise<void> {
      try {
        const response = await fetch(`${API_URL}/api/projects/${projectId}`)

        if (!response.ok) {
          throw new Error(`Failed to load project: ${response.status}`)
        }

        const result = await response.json()
        const project = result.data

        const selectedBoard = project.components.find((component: { type: string }) => component.type === 'board')

        if (!selectedBoard) {
          console.warn('No board found in project')
          return
        }

        const sortedColumns = selectedBoard.columns.map((column: BoardColumnType) => ({
          ...column,
          cards: sortedCardsByPriority(
            column.cards.map((card: BoardCardType) => ({
              ...card,
              startDate: new Date(card.startDate),
              deadline: new Date(card.deadline),
            })),
          ),
        }))

        this.activeBoard = {
          ...selectedBoard,
          columns: sortedColumns,
        }
      } catch (error) {
        console.error('Error loading board:', error)
        throw error
      }
    },
    // updateProjektName(name: string): void {
    //   this.projectName = name
    // },
    setActiveCardId(columnId: number, cardId: number): void {
      this.activeCardId = [columnId, cardId]
    },
  },
})
