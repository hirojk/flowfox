import { SessionModel } from '../models/Session.js'
import type { SessionPayload } from '../types/sessionTypes.js'

export const sessionStore = {
  set: async (token: string, data: SessionPayload, expiresIn: number = 7 * 24 * 60 * 60 * 1000): Promise<void> => {
    await SessionModel().findOneAndUpdate(
      { token },
      { token, user: data, expiresAt: new Date(Date.now() + expiresIn) },
      { upsert: true },
    )
  },

  get: async (token: string): Promise<SessionPayload | null> => {
    const session = await SessionModel().findOne({ token, expiresAt: { $gt: new Date() } })
    return session?.user ?? null
  },

  delete: async (token: string): Promise<void> => {
    await SessionModel().deleteOne({ token })
  },
}
