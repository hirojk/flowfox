import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { serviceUnavailableResponse } from '../utils/responses.js'
import { APP_ENV_VALUES } from '@pagewise/shared'

let database: mongoose.Connection | null = null
export const dbState = { isDbConnected: false }

export const databaseMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!dbState.isDbConnected) {
    try {
      await connectToDatabase()
    } catch (_error) {
      serviceUnavailableResponse(res, 'Database connection failed')
      return
    }
  }
  next()
}

export const connectToDatabase = async (): Promise<mongoose.Connection> => {
  const connectionUrl = process.env.MONGODB_URI || ''
  const dbName = process.env.APP_ENV === APP_ENV_VALUES.PRODUCTION ? 'productiondb' : 'testdb'

  try {
    await mongoose.connect(connectionUrl)

    database = mongoose.connection.useDb(dbName)
    dbState.isDbConnected = true

    console.log('\nConnected to pagewise database.')

    return database
  } catch (error) {
    console.error('\nDatabase connection error:', error)
    process.exit(1)
  }
}

export const getDatabase = (): mongoose.Connection => {
  if (!database) {
    throw new Error('\nDatabase not initialized. Call connectToDatabase first.')
  }
  return database
}
