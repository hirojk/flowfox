import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { connectToDatabase } from '@config/database'
import userRoutes from '@routes/userRoutes'
import projectRoutes from '@routes/projectRoutes'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  quiet: true,
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Use routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

app.listen(PORT, async () => {
  console.log(`\nServer running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}\n`)
  await connectToDatabase()
})
