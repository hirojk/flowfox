import mongoose, { Schema } from 'mongoose'
import { zodToMongooseSchema } from '@utils/zodToMongoose'
import {
  CheckboxItemSchema,
  BoardTagSchema,
  BoardCardSchema,
  BoardColumnSchema,
  BoardSchema,
} from '@shared/schemas/boardSchema'

const database = mongoose.connection.useDb('flowfoxdb')
const checklistItemSchema = new Schema(zodToMongooseSchema(CheckboxItemSchema), { _id: false })
const tagSchema = new Schema(zodToMongooseSchema(BoardTagSchema), { _id: false })
const cardSchema = new Schema(zodToMongooseSchema(BoardCardSchema))
const columnSchema = new Schema(zodToMongooseSchema(BoardColumnSchema))
const boardSchema = new Schema(zodToMongooseSchema(BoardSchema))

export const BoardModel = database.model('Board', boardSchema)
export default BoardModel
