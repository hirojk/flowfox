import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { databaseMiddleware } from './database.js'

export const registerMiddleware = (app: express.Application): void => {
  app.use(
    cors({
      origin: (origin, callback) => {
        const allowed = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')

        if (!origin || allowed.includes(origin)) {
          callback(null, origin)
        } else {
          callback(new Error(`CORS blocked: ${origin}`))
        }
      },
      credentials: true,
    }),
  )
  app.use(express.json())
  app.use(cookieParser())
  app.use(databaseMiddleware)
}
