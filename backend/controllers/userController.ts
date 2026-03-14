import { Request, Response } from 'express'
import UserModel from '../models/User.js'
import { generateId } from '@flowfox/shared'
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
  serverFailureResponse,
} from '../utils/responses.js'

// POST: create new user
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const userModel = UserModel()
    const { username, fullName } = req.body
    const existingUser = await userModel.findOne({ $or: [{ username }] })

    if (existingUser) {
      badRequestResponse(res, 'User already exists')
      return
    }

    const user = new userModel({
      id: generateId(),
      username,
      fullName,
    })
    await user.save()

    createdResponse(res, 'User created successfully', user)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// GET: get all users
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel().find().select('-password')

    successResponse(res, undefined, {
      userCount: users.length,
      users,
    })
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// GET: search single user by ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel().findOne({ id: req.params.id }).select('-password')

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, undefined, user)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// DELETE: delete user by ID
export async function deleteUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel().findOneAndDelete({ id: req.params.id })

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, 'User deleted successfully')
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// PUT: update user by ID
export async function updateUserById(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body
    const user = await UserModel()
      .findOneAndUpdate({ id: req.params.id }, { username }, { returnDocument: 'after' })
      .select('-password')

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, 'User updated successfully', user)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}
