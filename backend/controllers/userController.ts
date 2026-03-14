import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Request, Response } from 'express'
import UserModel from '../models/User.js'
import { UserSchema } from '@flowfox/shared'
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
    const { username, name, password } = req.body

    const existingUser = await userModel.findOne({ $or: [{ username }] })
    if (existingUser) {
      badRequestResponse(res, 'User already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const userData = UserSchema.parse({
      id: generateId(),
      username,
      name,
      password: hashedPassword,
    })
    const user = new userModel(userData)
    await user.save()

    createdResponse(res, 'User created successfully', user)
  } catch (error: any) {
    serverFailureResponse(res, error.message)
  }
}

// POST: login user
function createToken(payload: object): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' })
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const userModel = UserModel()
    const { username, password } = req.body

    const admin = {
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS,
    }
    if (username === admin.username && password === admin.password) {
      return successResponse(res, 'Login successful', { token: createToken({ username, role: 'admin' }) })
    }

    const user = await userModel.findOne({ username }).select('+password')

    if (!user) {
      badRequestResponse(res, 'Invalid credentials')
      return
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      badRequestResponse(res, 'Password is incorrect')
      return
    }

    const token = createToken({ id: user.id, username, role: user.role })

    successResponse(res, 'Login successful', { token })
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
