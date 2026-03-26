import { defineStore } from 'pinia'
import api from '@services/api'
import type { ProjectType } from '@flowfox/shared'

export const useProjectStore = defineStore('project', {
  state: () => ({
    allProjects: [] as ProjectType[],
    activeProject: null as ProjectType | null,
  }),

  actions: {
    async loadProjects(): Promise<void> {
      try {
        const response = (await api.get(`/api/v1/projects/user`)) as { data: { projects: ProjectType[] } }

        this.allProjects = response.data.projects
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async createNewProject(): Promise<ProjectType> {
      try {
        const response = (await api.post(`/api/v1/projects/`)) as { data: ProjectType }

        this.allProjects.push(response.data)
        this.activeProject = response.data

        return response.data
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    getFirstComponentId(projectId: number): number | null {
      const project = this.allProjects.find((p) => p.id === projectId)

      return (project?.components[0]?.id as number) ?? null
    },
    async deleteProject(projectId: number): Promise<void> {
      if (!projectId) return

      try {
        await api.delete(`/api/v1/projects/${projectId}`)

        this.allProjects = this.allProjects.filter((project) => project.id !== projectId)
        this.activeProject = null
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async updateProjectName(projectId: number, newName: string): Promise<void> {
      if (!projectId) return

      try {
        await api.put(`/api/v1/projects/${projectId}`, {
          name: newName,
        })

        this.allProjects = this.allProjects.map((project) => {
          if (project.id === projectId) {
            return { ...project, name: newName }
          }
          return project
        })

        if (this.activeProject?.id === projectId) {
          this.activeProject.name = newName
        }
      } catch (error) {
        console.error('Error updating project name:', error)
        throw error
      }
    },
    async updateProject(projectId: number): Promise<void> {
      if (!projectId) return

      try {
        const response = (await api.get(`/api/v1/projects/user`)) as { data: { projects: ProjectType[] } }

        this.activeProject = response.data.projects.find((project) => project.id === projectId) || null
      } catch (error) {
        console.error('Error loading project:', error)
        this.activeProject = null
      }
    },
  },
})
