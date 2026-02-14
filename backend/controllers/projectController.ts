import { Request, Response } from 'express'
import ProjectModel from '@models/Project'
import UserModel from '@models/User'
import { generateId } from '@shared/utils/idGenerator'
import { successResponse, createdResponse, notFoundResponse, badRequestResponse, errorResponse } from '@utils/responses'

// POST: create new project
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { projectName, userId } = req.body

    if (!projectName || !userId) {
      badRequestResponse(res, 'projectName and userId are required')
      return
    }

    const project = new ProjectModel({
      id: generateId(),
      projectName,
      creatorId: userId,
      components: [],
    })
    await project.save()

    createdResponse(res, 'Project created successfully', project)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

// GET: get all projects by user ID
export async function getAllProjectsByUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params

    const user = await UserModel.findOne({ id: userId })
    const projects = await ProjectModel.find({ creatorId: userId })

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, undefined, {
      projectCount: projects.length,
      projects,
    })
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

// DELETE: delete project by ID
export async function deleteProjectById(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.body
    const project = await ProjectModel.findOneAndDelete({ id: req.params.projectId, creatorId: userId })

    if (!userId) {
      badRequestResponse(res, 'userId is required')
      return
    }

    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    successResponse(res, 'Project deleted successfully')
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}
