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
    console.log('\nConnected to flowfox database.')

    return database
  } catch (error) {
    console.error('\nDatabase connection error:', error)
    process.exit(1)
  }
}

export function getDatabase(): mongoose.Connection {
  if (!database) {
    throw new Error('\nDatabase not initialized. Call connectToDatabase first.')
  }
  return database
}
