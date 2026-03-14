import jwt from 'jsonwebtoken'

import { Router, Request, Response } from 'express'
import { successResponse, notAuthenticatedResponse } from '../utils/responses.js'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body

  const VALID_USER = process.env.ADMIN_USER
  const VALID_PASS = process.env.ADMIN_PASS

  if (username === VALID_USER && password === VALID_PASS) {
    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' })

    return successResponse(res, 'Login successful', { accessToken })
  }

  return notAuthenticatedResponse(res, 'Invalid credentials')
})

export default router
