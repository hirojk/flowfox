import { Router, Request, Response } from 'express'
import { successResponse, notAuthenticatedResponse } from '../utils/responses'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body

  const VALID_USER = process.env.ADMIN_USER
  const VALID_PASS = process.env.ADMIN_PASS

  if (username === VALID_USER && password === VALID_PASS) {
    return successResponse(res, 'Login successful')
  }

  return notAuthenticatedResponse(res, 'Invalid credentials')
})

export default router
