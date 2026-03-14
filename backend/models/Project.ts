import mongoose, { Schema } from 'mongoose'
import { zodToMongooseSchema } from '../utils/zodToMongoose.js'
import { ProjectSchema } from '@flowfox/shared'

const database = mongoose.connection.useDb('flowfoxdb')
const projectSchema = new Schema(zodToMongooseSchema(ProjectSchema), { timestamps: true })

export const ProjectModel = database.model('Project', projectSchema)
export default ProjectModel
