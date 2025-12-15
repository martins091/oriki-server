// routes/verifyQR.js
const express = require("express");
const router = express.Router();
const {
  scanQRCode,
  verifyGuest,
  checkInGuest,
  verifyAndCheckIn,
  getStats,
  getAllGuests
} = require("../controllers/verifyQRController");

// Scan QR code
router.post("/scan", scanQRCode);

// Verify guest
router.post("/verify", verifyGuest);

// Check-in guest
router.post("/checkin", checkInGuest);

// Verify and check-in in one action
router.post("/verify-checkin", verifyAndCheckIn);

// Get statistics
router.get("/stats", getStats);

// Get all guests (admin)
router.get("/guests", getAllGuests);

module.exports = router;