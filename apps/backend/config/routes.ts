import express from 'express'
import { successResponse } from '../utils/responses.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import authRoutes from '../routes/authRoutes.js'
import userRoutes from '../routes/userRoutes.js'
import projectRoutes from '../routes/projectRoutes.js'

export const registerRoutes = (app: express.Application): void => {
  app.get('/api/health', (req, res) => successResponse(res, 'Server is healthy'))

  app.use('/api/auth', authRoutes)
  app.use('/api/v1/users', authMiddleware, userRoutes)
  app.use('/api/v1/projects', authMiddleware, projectRoutes)
}
