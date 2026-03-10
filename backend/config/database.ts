import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { serviceUnavailableResponse } from '../utils/responses'

let database: mongoose.Connection | null = null
export const dbState = { isDbConnected: false }

export async function databaseMiddleware(req: Request, res: Response, next: NextFunction) {
  if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') && !dbState.isDbConnected) {
    try {
      await connectToDatabase()
    } catch (error) {
      serviceUnavailableResponse(res, 'Database connection failed')
    }
  }
  next()
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
  const CONNECTION_URL = process.env.MONGODB_URI || ''

  try {
    await mongoose.connect(CONNECTION_URL)

    database = mongoose.connection.useDb('flowfoxdb')
    dbState.isDbConnected = true

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
