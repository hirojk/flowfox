import { Schema } from 'mongoose'
import { getDatabase } from '../config/database.js'
import { zodToMongooseSchema } from '../utils/zodToMongoose.js'
import { UserSchema } from '@flowfox/shared'

const userSchema = new Schema(zodToMongooseSchema(UserSchema), { timestamps: true })

export const UserModel = () => getDatabase().model('User', userSchema)
export default UserModel
