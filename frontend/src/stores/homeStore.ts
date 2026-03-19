import { defineStore } from 'pinia'
import api from '@services/api'
import type { ProjectType } from '@flowfox/shared'
import type { BoardType } from '@flowfox/shared'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    userProjects: [] as ProjectType[],
    activeProjectId: null as number | null,
    activeProject: null as ProjectType | null,
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
    // async updateActiveProject(name: String): Promise<void> {
    //   if (!this.activeProject) return

    //       try {
    //         await api.put(`/api/v1/projects/${this.activeProjectId}/board/${this.activeBoard.id}`, { boardName: name })

    //         this.activeProject.projectName = name
    //       } catch (error) {
    //         console.error('Error updating project name:', error)
    //         throw error
    //       }
    // },
    getFirstComponent(projectId: number): BoardType | null {
      const project = this.userProjects.find((project) => project.id === projectId)

      return project?.components[0] ?? null
    },
  },
})
