import mongoose from 'mongoose'

const database = mongoose.connection.useDb('flowfoxdb')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
)

const UserModel = database.model('User', userSchema) as mongoose.Model<any>
export default UserModel
