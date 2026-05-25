import { Schema } from 'mongoose'
import { getDatabase } from '../config/database.js'
import { zodToMongooseSchema } from '../utils/zodToMongoose.js'
import { ProjectSchema } from '@pagewise/shared'

const projectSchema = new Schema(zodToMongooseSchema(ProjectSchema), { timestamps: true })

export const ProjectModel = () => getDatabase().model('Project', projectSchema)
export default ProjectModel
