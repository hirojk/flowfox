import { Request, Response, NextFunction } from 'express'
import { notAuthenticatedResponse } from '../utils/responses'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const VALID_USER = process.env.ADMIN_USER
  const VALID_PASS = process.env.ADMIN_PASS

  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return notAuthenticatedResponse(res, 'No credentials provided')
  }

  // Erwartet: 'Basic base64(username:password)'
  const base64 = authHeader.replace('Basic ', '')
  const decoded = Buffer.from(base64, 'base64').toString('utf-8')
  const [username, password] = decoded.split(':')

  if (username === VALID_USER && password === VALID_PASS) {
    return next()
  }

  return notAuthenticatedResponse(res, 'Invalid credentials')
}
