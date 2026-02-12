import mongoose from 'mongoose'

const database = mongoose.connection.useDb('flowfoxdb')

const checklistItemSchema = new mongoose.Schema({
  isChecked: { type: Boolean, default: false },
  label: { type: String, required: true },
})

const tagSchema = new mongoose.Schema({
  label: { type: String, required: true },
  color: { type: String, required: true },
})

const cardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  taskName: { type: String, required: true },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  description: String,
  checklist: [checklistItemSchema],
  startDate: Date,
  deadline: Date,
  tags: [tagSchema],
})

const columnSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  columnName: { type: String, required: true },
  cards: [cardSchema],
})

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    columns: [columnSchema],
  },
  {
    timestamps: true,
  }
)

const ProjectModel = database.model('Project', projectSchema) as mongoose.Model<any>
export default ProjectModel
