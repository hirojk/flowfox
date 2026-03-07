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

// PUT: update board component
export async function updateBoardComponent(req: Request, res: Response): Promise<void> {
  try {
    const projectId = Number(req.params.projectId)
    const boardId = Number(req.params.boardId)
    const { boardName } = req.body

    const result = await ProjectModel.updateOne(
      { id: projectId, 'components.id': boardId },
      { $set: { 'components.$.boardName': boardName } },
    )

    if (result.matchedCount === 0) {
      notFoundResponse(res, 'Board not found')
      return
    }

    successResponse(res, 'Board updated', result)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}
