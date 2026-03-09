import './config/env'
import express from 'express'
import cors from 'cors'
import { dbMiddleware } from './config/database'
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'
// import { authMiddleware } from './middleware/authMiddleware'
import { startlocalServer } from './config/localServer'

const app = express()
const PORT: string | number = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(dbMiddleware)

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/projects', projectRoutes)

export default app
startlocalServer(app, PORT)
