import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ GET PROFILE + STATS
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    const bookings = await Booking.find({ userEmail: req.params.email });

    const total = bookings.length;
    const approved = bookings.filter(b => b.status === "approved").length;
    const pending = bookings.filter(b => b.status !== "approved").length;

    res.json({
      user,
      stats: { total, approved, pending },
    });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// ✅ UPDATE PROFILE
router.put("/:email", async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;