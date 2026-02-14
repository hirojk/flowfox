import mongoose, { Schema } from 'mongoose'
import { zodToMongooseSchema } from '@utils/zodToMongoose'
import {
  CheckboxItemSchema,
  BoardTagSchema,
  BoardCardSchema,
  BoardColumnSchema,
  BoardSchema,
} from '@shared/schemas/boardSchema'
import { ProjectSchema } from '@shared/schemas/projectSchema'

const database = mongoose.connection.useDb('flowfoxdb')

const checklistItemSchema = new Schema(zodToMongooseSchema(CheckboxItemSchema), { _id: false })
const tagSchema = new Schema(zodToMongooseSchema(BoardTagSchema), { _id: false })
const cardSchema = new Schema(zodToMongooseSchema(BoardCardSchema))
const columnSchema = new Schema(zodToMongooseSchema(BoardColumnSchema))
const boardSchema = new Schema(zodToMongooseSchema(BoardSchema), { timestamps: true })
const projectSchema = new Schema(zodToMongooseSchema(ProjectSchema), { timestamps: true })

export const ProjectModel = database.model('Project', projectSchema)
export default ProjectModel
