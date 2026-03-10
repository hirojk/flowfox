import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'
import { notAuthenticatedResponse } from '../utils/responses'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.replace('Bearer ', '')

  if (token == null) {
    return notAuthenticatedResponse(res, 'No token provided')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error) => {
    if (error) {
      return notAuthenticatedResponse(res, 'Invalid token')
    }
    next()
  })
}
