import crypto from 'crypto'
import { Response } from 'express'
import { sessionStore } from './sessionStore.js'
import { SessionPayload } from '../types/sessionTypes.js'

export const maxSessionDuration = 7 * 24 * 60 * 60 * 1000

export const renameUserToLowercase = (username: string): string => {
  return username.toLowerCase()
}

export const createOpaqueToken = async (payload: SessionPayload): Promise<string> => {
  const token = crypto.randomBytes(32).toString('hex')
  await sessionStore.set(token, payload)
  return token
}

export const issueSession = async (res: Response, payload: SessionPayload): Promise<string> => {
  const token = await createOpaqueToken(payload)
  setSessionCookie(res, token)
  return token
}

export const setSessionCookie = (res: Response, token: string): void => {
  res.cookie('sessionToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: maxSessionDuration,
  })
}
