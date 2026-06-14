import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import authRoutes from '../routes/authRoutes.js'
import userRoutes from '../routes/userRoutes.js'
import projectRoutes from '../routes/projectRoutes.js'

export const registerRoutes = (app: express.Application): void => {
  app.use('/api/auth', authRoutes)
  app.use('/api/v1/users', authMiddleware, userRoutes)
  app.use('/api/v1/projects', authMiddleware, projectRoutes)
}
