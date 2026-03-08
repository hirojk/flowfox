import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true,
})

const CONNECTION_URL = process.env.MONGODB_URI || ''
let database: mongoose.Connection | null = null

export async function connectToDatabase(): Promise<mongoose.Connection> {
  try {
    await mongoose.connect(CONNECTION_URL)

    database = mongoose.connection.useDb('flowfoxdb')
    console.log('Connected to flowfox database.\n')
    console.log('------------------------------------------------\n')

    return database
  } catch (error) {
    console.error('Database connection error:', error)
    console.log('\n------------------------------------------------\n')
    process.exit(1)
  }
}

export function getDatabase(): mongoose.Connection {
  if (!database) {
    throw new Error('Database not initialized. Call connectToDatabase first.\n')
  }
  return database
}
