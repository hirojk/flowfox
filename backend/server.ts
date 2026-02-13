import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/database'
import userRoutes from './routes/userRoutes'
import projectRoutes from './routes/projectRoutes'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Use routes
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

app.listen(PORT, async () => {
  console.log(`\nServer running on port ${PORT}`)
  await connectToDatabase()
})
