const User = require("../models/User");

// Create new user (POST)
async function createUser(req, res) {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ username });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all users (GET)
async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");

    res.json({
      userCount: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get single user by ID (GET)
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, getUsers, getUserById };
