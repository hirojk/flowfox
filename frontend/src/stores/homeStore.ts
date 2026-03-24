import { defineStore } from 'pinia'
import api from '@services/api'
import router from '@/router'
import type { ProjectType } from '@flowfox/shared'

export const useProjectStore = defineStore('project', {
  state: () => ({
    allProjects: [] as ProjectType[],
    activeProjectId: null as number | null,
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
    async createNewProject(): Promise<void> {
      try {
        const response = (await api.post(`/api/v1/projects/`)) as { data: ProjectType }

        this.allProjects.push(response.data)
        this.activeProjectId = response.data.id
        this.activeProject = response.data

        router.push({ name: 'project', params: { projectId: String(response.data.id) } })
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async deleteActiveProject(): Promise<void> {
      if (!this.activeProjectId) return

      try {
        await api.delete(`/api/v1/projects/${this.activeProjectId}`)

        this.allProjects = this.allProjects.filter((project) => project.id !== this.activeProjectId)
        this.activeProjectId = null
        this.activeProject = null
      } catch (error) {
        console.error('Error loading projects:', error)
        throw error
      }
    },
    async updateActiveProject(projectId: number): Promise<void> {
      this.activeProjectId = projectId

      try {
        const response = (await api.get(`/api/v1/projects/user`)) as { data: { projects: ProjectType[] } }

        this.activeProject = response.data.projects.find((project) => project.id === projectId) || null
      } catch (error) {
        console.error('Error loading project:', error)
        this.activeProject = null
      }
    },
    getFirstComponentId(projectId: number): number | null {
      const project = this.allProjects.find((p) => p.id === projectId)

      return (project?.components[0]?.id as number) ?? null
    },
    async updateProjectName(newName: string): Promise<void> {
      if (!this.activeProject || !this.activeProjectId) return

      try {
        await api.put(`/api/v1/projects/${this.activeProjectId}`, {
          name: newName,
        })

        this.activeProject.name = newName
      } catch (error) {
        console.error('Error updating project name:', error)
        throw error
      }
    },
  },
})
