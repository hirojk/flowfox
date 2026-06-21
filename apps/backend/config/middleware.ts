import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { databaseMiddleware } from './database.js'

export const registerMiddleware = (app: express.Application): void => {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true)
          return
        }

        const allowed = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')
        const isAllowed =
          !origin || origin.includes('localhost') || /\.vercel\.app$/.test(origin) || allowed.includes(origin)

        if (isAllowed) {
          callback(null, true)
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
