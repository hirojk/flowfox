import { UserType } from '@pagewise/shared'

export type SessionPayload = Omit<UserType, 'password'>

export interface SessionData {
  [key: string]: {
    user: SessionPayload
    expiresAt: number
  }
}
