import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'
import { notAuthenticatedResponse } from '../utils/responses.js'

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization']
  const userToken = authHeader && authHeader.replace('Bearer ', '')

  if (userToken == null) {
    return notAuthenticatedResponse(res, 'No User Token provided')
  }

  jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET!, (error, decoded) => {
    if (error) {
      return notAuthenticatedResponse(res, 'Invalid User Token')
    }
    req.user = decoded as typeof req.user
    next()
  })
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    return notAuthenticatedResponse(res, 'Admin access required')
  }
  next()
}
