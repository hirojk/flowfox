import mongoose, { Schema } from 'mongoose'
import { zodToMongooseSchema } from '../utils/zodToMongoose.js'
import {
  CheckboxItemSchema,
  BoardTagSchema,
  BoardCardSchema,
  BoardColumnSchema,
  type ProjectType,
} from '@shared/schemas/boardSchema'

const database = mongoose.connection.useDb('flowfoxdb')

const checklistItemSchema = new Schema(zodToMongooseSchema(CheckboxItemSchema))
const tagSchema = new Schema(zodToMongooseSchema(BoardTagSchema))
const cardSchema = new Schema(zodToMongooseSchema(BoardCardSchema))
const columnSchema = new Schema(zodToMongooseSchema(BoardColumnSchema))

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    columns: [columnSchema],
  },
  {
    timestamps: true,
  }
)

export interface ProjectDocument extends ProjectType {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export const ProjectModel = database.model<ProjectDocument>('Project', projectSchema)
export default ProjectModel
