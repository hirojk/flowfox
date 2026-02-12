const mongoose = require("mongoose");

const database = mongoose.connection.useDb("flowfoxdb");
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
  },
);

module.exports = database.model("User", userSchema);
