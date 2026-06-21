import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { databaseMiddleware } from './database.js'

export const registerMiddleware = (app: express.Application): void => {
  const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true)

      const allowed = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')
      const isAllowed = origin.includes('localhost') || /\.vercel\.app$/.test(origin) || allowed.includes(origin)

      if (isAllowed) {
        callback(null, true)
      } else {
        callback(new Error(`CORS blocked: ${origin}`))
      }
    },
    credentials: true,
  }

  app.options('/{*path}', cors(corsOptions))
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(cookieParser())
  app.use(databaseMiddleware)
}
