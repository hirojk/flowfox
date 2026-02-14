import { Request, Response } from 'express'
import ProjectModel from '@models/Project'
import UserModel from '@models/User'
import { generateId } from '@shared/utils/idGenerator'

// POST: create new project
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { projectName, userId } = req.body

    if (!projectName || !userId) {
      res.status(400).json({
        error: 'projectName and userId are required',
      })
      return
    }

    const project = new ProjectModel({
      id: generateId(),
      projectName,
      creatorId: userId,
      components: [],
    })
    await project.save()

    res.status(201).json({
      message: 'Project created successfully',
      project,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}

// GET: get all projects by user ID
export async function getAllProjectsByUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params

    const user = await UserModel.findOne({ id: userId })
    const projects = await ProjectModel.find({ creatorId: userId })

    if (!user) {
      res.status(404).json({
        error: 'User not found',
      })
      return
    }

    res.json({
      projectCount: projects.length,
      projects,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}
