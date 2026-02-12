const mongoose = require("mongoose");
const { getDatabase } = require("../config/database");

async function testDatabaseConnection(req, res) {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    return res
      .status(500)
      .json({ error: "Database connection not established" });
  }

  try {
    const database = getDatabase();
    const collections = await database.db.listCollections().toArray();

    res.json({
      message: "Database connected",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { testDatabaseConnection };
