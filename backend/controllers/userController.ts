import { Request, Response } from 'express'
import UserModel from '@models/User'

// Create new user (POST)
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username } = req.body

    const existingUser = await UserModel.findOne({ $or: [{ username }] })
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' })
      return
    }

    const user = new UserModel({ username })
    await user.save()

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, username: user.username },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get all users (GET)
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.find().select('-password')

    res.json({ userCount: users.length, users })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Get single user by ID (GET)
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const user = await UserModel.findById(req.params.id).select('-password')

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({ user })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
