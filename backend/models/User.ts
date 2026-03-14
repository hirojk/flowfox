import mongoose, { Schema } from 'mongoose'
import { zodToMongooseSchema } from '../utils/zodToMongoose'
import { UserSchema } from '@flowfox/shared'

const database = mongoose.connection.useDb('flowfoxdb')
const userSchema = new Schema(zodToMongooseSchema(UserSchema), { timestamps: true })

export const UserModel = database.model('User', userSchema)
export default UserModel
