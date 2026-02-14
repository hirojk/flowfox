import { Request, Response } from 'express'
import UserModel from '@models/User'
import { generateId } from '@shared/utils/idGenerator'
import { successResponse, createdResponse, notFoundResponse, badRequestResponse, errorResponse } from '@utils/responses'

// POST: create new user
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body

    const existingUser = await UserModel.findOne({ $or: [{ username }] })
    if (existingUser) {
      badRequestResponse(res, 'User already exists')
      return
    }

    const user = new UserModel({
      id: generateId(),
      username,
    })
    await user.save()

    createdResponse(res, 'User created successfully', user)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

// GET: get all users
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find().select('-password')

    successResponse(res, undefined, {
      userCount: users.length,
      users,
    })
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

// GET: search single user by ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.findOne({ id: req.params.id }).select('-password')

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, undefined, user)
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}

// DELETE: delete user by ID
export async function deleteUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.findOneAndDelete({ id: req.params.id })

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, 'User deleted successfully')
  } catch (error: any) {
    errorResponse(res, error.message)
  }
}
