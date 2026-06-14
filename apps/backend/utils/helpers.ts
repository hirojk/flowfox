import crypto from 'crypto'
import { Response } from 'express'
import { sessionStore } from './sessionStore.js'
import { SessionPayload } from '../types/sessionTypes.js'

export const normalizedUsername = (username: string): string => {
  return username.toLowerCase()
}

export const createOpaqueToken = (payload: SessionPayload): string => {
  const token = crypto.randomBytes(32).toString('hex')
  sessionStore.set(token, payload, 7 * 24 * 60 * 60 * 1000)
  return token
}

export const setSessionCookie = (res: Response, token: string): void => {
  res.cookie('sessionToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export const issueSession = (res: Response, payload: SessionPayload): string => {
  const token = createOpaqueToken(payload)
  setSessionCookie(res, token)
  return token
}
