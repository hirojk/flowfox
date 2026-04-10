import { Request, Response } from 'express'
import { ProjectModel } from '../models/Project.js'
import { BoardSchema, generateId, type BoardType } from '@flowfox/shared'

import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
  serverFailureResponse,
} from '../utils/responses.js'

// POST: create new board component
export const createBoardComponent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params
    const userId = req.user!.id

    const project = await ProjectModel().findOne({
      id: Number(projectId),
    })
    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    const newBoard = BoardSchema.parse({
      id: generateId(),
      creatorId: userId,
    })

    const components = project.components as BoardType[]
    components.push(newBoard)
    await project.save()

    createdResponse(res, 'New Board created successfully', newBoard)
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// GET: get board by id
export const getBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, boardId } = req.params

    const project = await ProjectModel().findOne({ id: Number(projectId) })
    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    const components = project.components as BoardType[]
    const board = components.find((component) => component.type === 'board' && component.id === Number(boardId))
    if (!board) {
      notFoundResponse(res, 'Board not found')
      return
    }

    successResponse(res, undefined, board)
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// DELETE: delete board by ID
export const deleteBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, boardId } = req.params

    const project = await ProjectModel().findOne({ id: Number(projectId) })
    if (!project) {
      notFoundResponse(res, 'Project not found')
      return
    }

    const components = project.components as BoardType[]
    const boardExists = components.find(
      (component: BoardType) => component.type === 'board' && component.id === Number(boardId),
    )
    if (!boardExists) {
      notFoundResponse(res, 'Board not found')
      return
    }

    project.components = components.filter((component: BoardType) => component.id !== Number(boardId))
    await project.save()

    successResponse(res, 'Board deleted successfully')
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// PUT: update board name and data
export const updateBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = Number(req.params.projectId)
    const boardId = Number(req.params.boardId)
    const { name, boardData } = req.body

    if (name) {
      const result = await ProjectModel().updateOne(
        { id: projectId, 'components.id': boardId },
        { $set: { 'components.$.name': name } },
      )

      if (result.matchedCount === 0) {
        notFoundResponse(res, 'Board not found')
        return
      }

      successResponse(res, 'Board name updated', { name })
      return
    }

    if (boardData) {
      const project = await ProjectModel().findOne({ id: projectId })
      if (!project) {
        notFoundResponse(res, 'Project not found')
        return
      }

      const components = project.components as BoardType[]
      const boardIndex = components.findIndex(
        (component: BoardType) => component.type === 'board' && component.id === boardId,
      )
      if (boardIndex === -1) {
        notFoundResponse(res, 'Board not found')
        return
      }

      components[boardIndex] = { ...boardData, id: boardId, type: 'board' }
      project.components = components as BoardType[]
      await project.save()

      successResponse(res, 'Board updated successfully', components[boardIndex])
      return
    }

    badRequestResponse(res, 'Either boardName or boardData is required')
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}
