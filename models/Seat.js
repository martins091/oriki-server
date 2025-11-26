const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ["REGULAR", "VIP", "VVIP"],
    required: true
  },
  assigned: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    default: null
  }
});

module.exports = mongoose.model("Seat", SeatSchema);
