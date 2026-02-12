const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);

app.listen(PORT, async () => {
  console.log(`\nServer running on port ${PORT}`);
  await connectToDatabase();
});
