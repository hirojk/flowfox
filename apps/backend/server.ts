import './config/env.js'
import express from 'express'
import cors from 'cors'
import { databaseMiddleware } from './config/database.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

import { startLocalServer } from './config/localServer.js'

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
