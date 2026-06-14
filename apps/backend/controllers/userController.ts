import bcrypt from 'bcrypt'

import { Request, Response } from 'express'
import { UserModel } from '../models/User.js'
import { ROLE_VALUES, UserSchema, UserType, generateId } from '@pagewise/shared'
import { normalizedUsername, issueSession } from '../utils/helpers.js'
import { sessionStore } from '../utils/sessionStore.js'
import {
  successResponse,
  createdResponse,
  notFoundResponse,
  badRequestResponse,
  serverFailureResponse,
} from '../utils/responses.js'

// POST: create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userModel = UserModel()
    const { username, name, password } = req.body

    const lowCaseUserName = normalizedUsername(username)

    const existingUser = await userModel.findOne({ username: lowCaseUserName })
    if (existingUser) {
      badRequestResponse(res, 'User already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(password as string, 12)

    const userData = UserSchema.parse({
      id: generateId(),
      username: lowCaseUserName,
      name,
      password: hashedPassword,
    })
    const newUser = new userModel(userData)
    await newUser.save()

    createdResponse(res, 'User created successfully', newUser)
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// POST: login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userModel = UserModel()
    const { username, password } = req.body as { username: string; password: string }

    const lowCaseUserName = normalizedUsername(username)

    const admin = {
      username: normalizedUsername(process.env.ADMIN_USER || ''),
      password: process.env.ADMIN_PASS,
    }
    if (lowCaseUserName === admin.username && password === admin.password) {
      const token = await issueSession(res, {
        id: 0,
        username: lowCaseUserName,
        name: 'Admin',
        email: '',
        role: ROLE_VALUES.ADMIN,
      })
      successResponse(res, 'Login successful', { sessionToken: token })
      return
    }

    const user = await userModel.findOne({ username: lowCaseUserName }).select('+password')
    if (!user) {
      badRequestResponse(res, 'Invalid credentials')
      return
    }

    const isValid = await bcrypt.compare(password, user.password as string)
    if (!isValid) {
      badRequestResponse(res, 'Password is incorrect')
      return
    }

    const { password: _password, ...userPayload } = user.toObject() as unknown as UserType
    const token = await issueSession(res, userPayload)
    successResponse(res, 'Login successful', { sessionToken: token })
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// POST: logout user
export const logoutUser = (req: Request, res: Response): void => {
  const token = req.cookies.sessionToken
  if (token) {
    sessionStore.delete(token)
  }
  res.clearCookie('sessionToken')
  successResponse(res, 'Logged out successfully')
}

// GET: get my credentials
export const getMe = (req: Request, res: Response): void => {
  successResponse(res, undefined, req.user)
}

// GET: get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel().find().select('-password')

    successResponse(res, undefined, {
      userCount: users.length,
      users,
    })
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// GET: search single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel().findOne({ id: req.params.id }).select('-password')

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, undefined, user)
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// DELETE: delete user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel().findOneAndDelete({ id: req.params.id })

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, 'User deleted successfully')
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}

// PUT: update user by ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body
    const lowCaseUserName = normalizedUsername(username)

    const user = await UserModel()
      .findOneAndUpdate({ id: req.params.id }, { username: lowCaseUserName }, { returnDocument: 'after' })
      .select('-password')

    if (!user) {
      notFoundResponse(res, 'User not found')
      return
    }

    successResponse(res, 'User updated successfully', user)
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
}
