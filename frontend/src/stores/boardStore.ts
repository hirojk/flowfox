import { defineStore } from 'pinia'
import api from '@services/api'
import { useProjectStore } from '@stores/homeStore'
import type { BoardType, BoardColumnType, BoardCardType } from '@flowfox/shared'
import { sortedCardsByPriority } from '@constants/priority.ts'

export const useBoardStore = defineStore('board', {
  state: () => ({
    activeBoard: null as BoardType | null,
    activeCardId: [0, 0] as [number, number],
  }),

  actions: {
    async loadBoard(projectId: number, boardId: number): Promise<void> {
      try {
        const { data } = await api.get(`/api/v1/projects/${projectId}/board/${boardId}`)

        const selectedBoard = data

        if (!selectedBoard) {
          console.warn('No board component found')
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
      const projectStore = useProjectStore()
      if (!this.activeBoard || !projectStore.activeProjectId) return

      try {
        await api.put(`/api/v1/projects/${projectStore.activeProjectId}/board/${this.activeBoard.id}`, {
          boardName: name,
        })

        this.activeBoard.boardName = name

        const component = projectStore.activeProject?.components.find((c) => c.id === this.activeBoard?.id)
        if (component) component.boardName = name
      } catch (error) {
        console.error('Error updating project name:', error)
        throw error
      }
    },
    async updateBoard(): Promise<void> {
      const projectStore = useProjectStore()
      if (!this.activeBoard || !projectStore.activeProjectId) return

      try {
        await api.put(`/api/v1/projects/${projectStore.activeProjectId}/board/${this.activeBoard.id}`, {
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
