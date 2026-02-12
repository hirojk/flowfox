const express = require("express");
const { connectToDatabase } = require("./config/database");
const cors = require("cors");

// Routes
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);

app.listen(PORT, async () => {
  console.log(`\nServer running on port ${PORT}`);
  await connectToDatabase();
});
