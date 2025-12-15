const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },

  category: {
    type: String,
    enum: ["REGULAR", "VIP", "VVIP"],
    required: true,
  },

  seatNumber: { type: String, required: true },
  qrString: { type: String, required: true, unique: true },

  // Add these verification fields:
  verified: {
    type: Boolean,
    default: false,
  },

  verifiedAt: {
    type: Date,
    default: null,
  },

  verifiedBy: {
    type: String,
    default: null,
  },

  checkedIn: {
    type: Boolean,
    default: false,
  },

  checkedInAt: {
    type: Date,
    default: null,
  },

  checkedInBy: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Guest", GuestSchema);
