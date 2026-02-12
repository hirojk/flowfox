const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });

const CONNECTION_URL = process.env.MONGODB_URI;
let database = null;

async function connectToDatabase() {
  try {
    await mongoose.connect(CONNECTION_URL);

    database = mongoose.connection.useDb("flowfoxdb");
    console.log("Connected to flowfox database");

    return database;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return database;
}

module.exports = { connectToDatabase, getDatabase };
