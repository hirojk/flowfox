import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'
import { notAuthenticatedResponse } from '../utils/responses.js'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
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

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return notAuthenticatedResponse(res, 'Admin access required')
  }
  next()
}
