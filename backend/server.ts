import './config/env'
import express from 'express'
import cors from 'cors'
import { databaseMiddleware } from './config/database'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'

import { startLocalServer } from './config/localServer'

const app: express.Application = express()

app.use(cors())
app.use(express.json())

app.use(databaseMiddleware)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/v1/users', authMiddleware, userRoutes)
app.use('/api/v1/projects', authMiddleware, projectRoutes)

export default app
startLocalServer(app)
