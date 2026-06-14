import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Request, Response } from 'express'
import { UserModel } from '../models/User.js'
import { UserSchema, generateId } from '@pagewise/shared'
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

    const existingUser = await userModel.findOne({ $or: [{ username }] })
    if (existingUser) {
      badRequestResponse(res, 'User already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(password as string, 12)

    const userData = UserSchema.parse({
      id: generateId(),
      username,
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
const createToken = (payload: object): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' })
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userModel = UserModel()
    const { username, password } = req.body as { username: string; password: string }

    const admin = {
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS,
    }
    if (username === admin.username && password === admin.password) {
      successResponse(res, 'Login successful', { userToken: createToken({ username, role: 'admin' }) })
      return
    }

    const user = await userModel.findOne({ username }).select('+password')
    if (!user) {
      badRequestResponse(res, 'Invalid credentials')
      return
    }

    const isValid = await bcrypt.compare(password, user.password as string)
    if (!isValid) {
      badRequestResponse(res, 'Password is incorrect')
      return
    }

    const { password: _password, ...userPayload } = user.toObject()

    successResponse(res, 'Login successful', { userToken: createToken(userPayload) })
  } catch (error) {
    serverFailureResponse(res, (error as Error).message)
  }
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
    const user = await UserModel()
      .findOneAndUpdate({ id: req.params.id }, { username }, { returnDocument: 'after' })
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
