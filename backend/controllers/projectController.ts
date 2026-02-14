import { Request, Response } from 'express'
import ProjectModel from '@models/Project'
import UserModel from '@models/User'

// Create new project
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { projectName, userId } = req.body

    if (!projectName || !userId) {
      res.status(400).json({ error: 'projectName and userId are required' })
      return
    }

    const project = new ProjectModel({
      id: Date.now(),
      projectName,
      userId,
      components: [],
    })

    console.log('Saving project:', project)

    await project.save()

    res.status(201).json({ message: 'Project created successfully', project })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get all projects by user ID
export async function getAllProjectsByUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params

    const user = await UserModel.findById(userId)
    const projects = await ProjectModel.find({ userId })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({ projectCount: projects.length, projects })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get single project
export async function getProjectById(req: Request, res: Response): Promise<void> {
  try {
    const { projectId } = req.params
    const { userId } = req.query as { userId?: string }
    if (!userId) {
      res.status(400).json({ error: 'userId is required' })
      return
    }

    const project = await ProjectModel.findOne({ _id: projectId, userId })

    if (!project) {
      res.status(404).json({ error: 'Project not found' })
      return
    }

    res.json({ project })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
