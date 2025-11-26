const mongoose = require("mongoose");

const VIPCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ["VIP", "VVIP"],
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    default: null
  }
});

module.exports = mongoose.model("VIPCode", VIPCodeSchema);
