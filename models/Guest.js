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
    required: true
  },

  seatNumber: { type: String, required: true },

  qrString: { type: String, required: true, unique: true },

  checkedIn: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Guest", GuestSchema);
