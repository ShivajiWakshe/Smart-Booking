const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");


// ✅ CREATE BOOKING (USER)
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking Created ✅",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET ALL BOOKINGS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET USER BOOKINGS (IMPORTANT FIX)
router.get("/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ APPROVE BOOKING (ADMIN)
router.put("/approve/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });

    res.json({ message: "Booking Approved ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ REJECT BOOKING (ADMIN)
router.put("/reject/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });

    res.json({ message: "Booking Rejected ❌" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE BOOKING (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking Deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;