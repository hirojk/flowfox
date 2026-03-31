import { Request, Response } from 'express'
import { ProjectModel } from '../models/Project.js'
import { ProjectSchema, generateId } from '@flowfox/shared'
import { UserModel } from '../models/User.js'

import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
  serverFailureResponse,
} from '../utils/responses.js'

// POST: create new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectModel = ProjectModel()
    const userId = req.user!.id

    const projectData = ProjectSchema.parse({
      id: generateId(),
      creatorId: userId,
    })
    const newProject = new projectModel(projectData)
    await newProject.save()

    createdResponse(res, 'Project created successfully', newProject)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// GET: get single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params
    if (!projectId) {
      badRequestResponse(res, 'Invalid project ID')
      return
    }

    const project = await ProjectModel().findOne({ id: projectId })
    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    successResponse(res, undefined, project)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// GET: get all projects by user ID
export const getAllProjectsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id

    const user = await UserModel().findOne({ id: userId })
    const projects = await ProjectModel().find({ creatorId: userId })

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, undefined, {
      projectCount: projects.length,
      projects,
    })
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// DELETE: delete project by ID
export const deleteProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel().findOneAndDelete({ id: req.params.projectId })
    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    successResponse(res, 'Project deleted successfully')
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// PUT: update project by ID
export const updateProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, components } = req.body
    const project = await ProjectModel().findOneAndUpdate(
      { id: req.params.projectId },
      { name, components },
      { returnDocument: 'after' },
    )

    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    successResponse(res, 'Project updated successfully', project)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}
