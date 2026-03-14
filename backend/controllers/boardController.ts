import { Request, Response } from 'express'
import { ProjectModel } from '../models/Project.js'
import { BoardSchema } from '@flowfox/shared'
import { generateId } from '@flowfox/shared'
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
  serverFailureResponse,
} from '../utils/responses.js'

// POST: create new board component
export async function createBoardComponent(req: Request, res: Response): Promise<void> {
  try {
    const projectModel = ProjectModel()
    const { projectId } = req.params
    const { userId, boardName } = req.body

    if (!userId || !boardName) {
      badRequestResponse(res, 'userId and boardName are required')
      return
    }

    const project = await projectModel.findOne({ id: projectId })

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
    serverFailureResponse(res, error.message)
  }
}

// PUT: update board name and data
export async function updateBoard(req: Request, res: Response): Promise<void> {
  try {
    const projectId = Number(req.params.projectId)
    const boardId = Number(req.params.boardId)
    const { boardName, boardData } = req.body

    if (boardName) {
      const result = await ProjectModel().updateOne(
        { id: projectId, 'components.id': boardId },
        {
          $set: {
            'components.$.boardName': boardName,
          },
        },
      )

      if (result.matchedCount === 0) {
        notFoundResponse(res, 'Board not found')
        return
      }

      successResponse(res, 'Board name updated', { boardName })
      return
    }

    if (boardData) {
      const project = await ProjectModel().findOne({ id: projectId })

      if (!project) {
        notFoundResponse(res, 'Project not found')
        return
      }

      const boardIndex = project.components.findIndex((c: any) => c.type === 'board' && c.id === boardId)

      if (boardIndex === -1) {
        notFoundResponse(res, 'Board not found')
        return
      }

      project.components[boardIndex] = {
        ...boardData,
        id: boardId,
        type: 'board',
      }

      await project.save()

      successResponse(res, 'Board updated successfully', project.components[boardIndex])
      return
    }

    badRequestResponse(res, 'Either boardName or boardData is required')
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}
