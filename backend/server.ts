import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { connectToDatabase } from './config/database'
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true,
})

const app = express()

app.use(cors())
app.use(express.json())

let isDbConnected = false

app.use(async (req, res, next) => {
  if (!isDbConnected) {
    try {
      await connectToDatabase()
      isDbConnected = true
    } catch (error) {
      return res.status(503).json({ error: 'Database connection failed' })
    }
  }
  next()
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

export default app

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
  connectToDatabase()
    .then(() => {
      isDbConnected = true
      app.listen(5000, () => {
        console.log(`\nServer running on port 5000\n`)
        console.log('------------------------------------------------\n')
      })
    })
    .catch((error) => {
      console.error('Failed to start server:', error)
      console.log('------------------------------------------------\n')
      process.exit(1)
    })
}
