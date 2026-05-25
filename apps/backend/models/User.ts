import { Schema } from 'mongoose'
import { getDatabase } from '../config/database.js'
import { zodToMongooseSchema } from '../utils/zodToMongoose.js'
import { UserSchema } from '@pagewise/shared'

const userSchema = new Schema(zodToMongooseSchema(UserSchema), { timestamps: true })

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password
    return ret
  },
})

export const UserModel = () => getDatabase().model('User', userSchema)
export default UserModel
