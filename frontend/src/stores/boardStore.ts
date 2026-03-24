import { defineStore } from 'pinia'
import api from '@services/api'
import router from '@/router'
import { useProjectStore } from '@stores/homeStore'
import type { BoardType, BoardColumnType, BoardCardType } from '@flowfox/shared'
import { sortedCardsByPriority } from '@constants/priority.ts'

const getStores = () => ({
  projectStore: useProjectStore(),
})

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
    async createNewBoard(): Promise<void> {
      const { projectStore } = getStores()

      try {
        const response = (await api.post(`/api/v1/projects/${projectStore.activeProject?.id}/board`)) as {
          data: BoardType
        }

        this.activeBoard = response.data

        const allprojectsStore = projectStore.allProjects.find(
          (selectedProject) => selectedProject.id === projectStore.activeProject?.id,
        )
        if (allprojectsStore) {
          allprojectsStore.components.push(response.data)
        }

        projectStore.activeProject?.components.push(response.data)

        router.push({
          name: 'component',
          params: { projectId: String(projectStore.activeProject?.id), componentId: String(response.data.id) },
        })
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async deleteActiveBoard(): Promise<void> {
      const { projectStore } = getStores()

      if (!this.activeBoard?.id) return

      try {
        await api.delete(`/api/v1/projects/${projectStore.activeProject?.id}/board/${this.activeBoard.id}`)

        const boardId = this.activeBoard.id

        const project = projectStore.allProjects.find((project) => project.id === projectStore.activeProject?.id)
        if (project) {
          project.components = project.components.filter((component) => component.id !== boardId)
        }

        if (projectStore.activeProject) {
          projectStore.activeProject.components = projectStore.activeProject.components.filter(
            (component) => component.id !== boardId,
          )
        }

        this.activeBoard = null
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async updateBoardName(newName: string): Promise<void> {
      const { projectStore } = getStores()

      if (!this.activeBoard || !projectStore.activeProject?.id) return

      try {
        await api.put(`/api/v1/projects/${projectStore.activeProject.id}/board/${this.activeBoard.id}`, {
          name: newName,
        })

        this.activeBoard.name = newName

        const component = projectStore.activeProject?.components.find((c) => c.id === this.activeBoard?.id)
        if (component) component.name = newName
      } catch (error) {
        console.error('Error updating project name:', error)
        throw error
      }
    },
    async updateBoard(): Promise<void> {
      const { projectStore } = getStores()

      if (!this.activeBoard || !projectStore.activeProject?.id) return

      try {
        await api.put(`/api/v1/projects/${projectStore.activeProject.id}/board/${this.activeBoard.id}`, {
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
