const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,

    service: String,
    item: String,

    date: String,
    time: String,
    slot: String,
    location: String,

    status: {
      type: String,
      default: "pending", // pending | approved | rejected
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);