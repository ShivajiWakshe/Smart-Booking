const express = require("express");
const router = express.Router();

const User = require("../models/User");

// ✅ GET ALL USERS
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// ✅ DELETE USER
router.delete("/users/:email", async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });
  res.json({ message: "User deleted" });
});

module.exports = router;