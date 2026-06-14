import './config/env.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { databaseMiddleware } from './config/database.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

import { startLocalServer } from './config/localServer.js'

const app: express.Application = express()

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')
      if (!origin || allowed.includes(origin)) {
        callback(null, origin)
      } else {
        callback(new Error(`CORS blocked: ${origin}`))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.use(databaseMiddleware)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/v1/users', authMiddleware, userRoutes)
app.use('/api/v1/projects', authMiddleware, projectRoutes)

startLocalServer(app)
export default app
