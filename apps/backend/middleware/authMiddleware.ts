import { ROLE_VALUES } from '@pagewise/shared'

import { sessionStore } from '../utils/sessionStore.js'

import { Request, Response, NextFunction } from 'express'
import { notAuthenticatedResponse } from '../utils/responses.js'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.sessionToken

  if (!token) {
    return notAuthenticatedResponse(res, 'No session token provided')
  }

  const user = sessionStore.get(token)
  if (!user) {
    return notAuthenticatedResponse(res, 'Invalid or expired session token')
  }

  req.user = user
  next()
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== ROLE_VALUES.ADMIN) {
    return notAuthenticatedResponse(res, 'Admin access required')
  }
  next()
}
