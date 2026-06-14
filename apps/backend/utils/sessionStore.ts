import { SessionPayload, SessionData } from '../types/sessionTypes.js'

const sessions: SessionData = {}

export const sessionStore = {
  set: (token: string, data: SessionPayload, expiresIn: number = 7 * 24 * 60 * 60 * 1000) => {
    sessions[token] = {
      user: data,
      expiresAt: Date.now() + expiresIn,
    }
  },

  get: (token: string) => {
    const session = sessions[token]

    if (!session) return null
    if (Date.now() > session.expiresAt) {
      delete sessions[token]
      return null
    }

    return session.user
  },

  delete: (token: string) => {
    delete sessions[token]
  },

  cleanup: () => {
    Object.entries(sessions).forEach(([token, session]) => {
      if (Date.now() > session.expiresAt) {
        delete sessions[token]
      }
    })
  },
}

setInterval(() => sessionStore.cleanup(), 60 * 60 * 1000)
