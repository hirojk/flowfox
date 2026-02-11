const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

const CONNECTION_URL = process.env.MONGODB_URI;

app.use(cors());

let database;

async function connectToDatabase() {
  try {
    const client = new MongoClient(CONNECTION_URL);
    await client.connect();

    database = client.db("flowfoxdb");
    console.log("Connected to flowfox database");

    return database;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase();
});

app.get("/api/test", async (req, res) => {
  if (!database) {
    return res
      .status(500)
      .json({ error: "Database connection not established" });
  }

  try {
    const collections = await database.listCollections().toArray();
    res.json({
      message: "Database connected",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
