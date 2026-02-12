import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ quiet: true })

const CONNECTION_URL = process.env.MONGODB_URI || ''
let database: mongoose.Connection | null = null

export async function connectToDatabase(): Promise<mongoose.Connection> {
  try {
    await mongoose.connect(CONNECTION_URL)

    database = mongoose.connection.useDb('flowfoxdb')
    console.log('Connected to flowfox database')

    return database
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

export function getDatabase(): mongoose.Connection {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDatabase first.')
  }
  return database
}
