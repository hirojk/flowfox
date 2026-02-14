import { Request, Response } from 'express'
import UserModel from '@models/User'
import { generateId } from '@shared/utils/idGenerator'

// POST: create new user
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body

    const existingUser = await UserModel.findOne({ $or: [{ username }] })
    if (existingUser) {
      res.status(400).json({
        error: 'User already exists',
      })
      return
    }

    const user = new UserModel({
      id: generateId(),
      username,
    })
    await user.save()

    res.status(201).json({
      message: 'User created successfully',
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}

// GET: get all users
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find().select('-password')

    res.json({
      userCount: users.length,
      users,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}

// GET: get single user by ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.findOne({ id: req.params.id }).select('-password')

    if (!user) {
      res.status(404).json({
        error: 'User not found',
      })
      return
    }

    res.json({
      user,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}
