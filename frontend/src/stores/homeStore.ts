import { defineStore } from 'pinia'
import api from '@services/api'
import type { ProjectType } from '@flowfox/shared'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    userProjects: [] as ProjectType[],
  }),

  actions: {
    async loadProjects(): Promise<void> {
      try {
        const response = (await api.get(`/api/v1/projects/user`)) as { data: { projects: ProjectType[] } }

        this.userProjects = response.data.projects
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
  },
})
