import { Request, Response } from 'express'
import { ProjectModel } from '@models/Project'
import { BoardSchema } from '@shared/schemas/boardSchema'
import { generateId } from '@shared/utils/idGenerator'
import { successResponse, createdResponse, notFoundResponse, badRequestResponse, errorResponse } from '@utils/responses'

// POST: create new board component
export async function createBoardComponent(req: Request, res: Response): Promise<void> {
  try {
    const { projectId } = req.params
    const { userId, boardName } = req.body

    if (!userId || !boardName) {
      badRequestResponse(res, 'userId and boardName are required')
      return
    }

    const project = await ProjectModel.findOne({ id: projectId })

    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    const newBoard = BoardSchema.parse({
      id: generateId(),
      boardName,
      creatorId: userId,
    })

    project.components.push(newBoard)
    await project.save()

    createdResponse(res, 'New Board created successfully', newBoard)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}
