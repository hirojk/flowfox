import { defineStore } from 'pinia'
import api from '@services/api'
import type { BoardType, BoardColumnType, BoardCardType } from '@flowfox/shared'
import { sortedCardsByPriority } from '@constants/priority.ts'

export const useBoardStore = defineStore('board', {
  state: () => ({
    activeProjectId: null as number | null,
    activeBoard: null as BoardType | null,
    activeCardId: [0, 0] as [number, number],
  }),

  actions: {
    async loadBoard(projectId: number): Promise<void> {
      try {
        const { data } = await api.get(`/api/v1/projects/${projectId}`)

        this.activeProjectId = projectId
        const project = data

        const selectedBoard = project.components.find((component: { type: string }) => component.type === 'board')

        if (!selectedBoard) {
          console.warn('No board component found in project')
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
    async updateBoardName(name: string): Promise<void> {
      if (!this.activeBoard) return

      try {
        await api.put(`/api/v1/projects/${this.activeProjectId}/board/${this.activeBoard.id}`, { boardName: name })

        this.activeBoard.boardName = name
      } catch (error) {
        console.error('Error updating project name:', error)
        throw error
      }
    },
    async updateBoard(): Promise<void> {
      if (!this.activeBoard || !this.activeProjectId) return

      try {
        await api.put(`/api/v1/projects/${this.activeProjectId}/board/${this.activeBoard.id}`, {
          boardData: this.activeBoard,
        })
      } catch (error) {
        console.error('Error updating board:', error)
        throw error
      }
    },
    setActiveCardId(columnId: number, cardId: number): void {
      this.activeCardId = [columnId, cardId]
    },
  },
})
