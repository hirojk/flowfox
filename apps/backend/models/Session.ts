import { Schema } from 'mongoose'
import { getDatabase } from '../config/database.js'

const sessionSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    user: { type: Schema.Types.Mixed, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
)

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const SessionModel = () => getDatabase().model('Session', sessionSchema)
