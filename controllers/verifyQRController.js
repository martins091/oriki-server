// controllers/verifyQRController.js
const Guest = require("../models/Guest");

/**
 * Scan QR Code - View guest information only
 */
exports.scanQRCode = async (req, res) => {
  try {
    const { qrString } = req.body;

    console.log("📱 Received scan request for QR:", qrString?.substring(0, 20) + "...");

    if (!qrString) {
      return res.status(400).json({
        success: false,
        message: "QR code is required"
      });
    }

    // Find guest
    const guest = await Guest.findOne({ qrString }).lean();

    if (!guest) {
      console.log("❌ Guest not found for QR:", qrString);
      return res.status(404).json({
        success: false,
        message: "Guest not found. Invalid QR code."
      });
    }

    console.log("✅ Guest found:", guest.fullName, "Seat:", guest.seatNumber);

    // Determine status
    let status = 'PENDING';
    if (guest.checkedIn) status = 'CHECKED_IN';
    else if (guest.verified) status = 'VERIFIED';

    // Prepare response
    const response = {
      success: true,
      data: {
        guest: {
          id: guest._id,
          fullName: guest.fullName,
          email: guest.email,
          phone: guest.phone,
          gender: guest.gender,
          dob: guest.dob,
          category: guest.category,
          seatNumber: guest.seatNumber,
          verified: guest.verified || false,
          checkedIn: guest.checkedIn || false,
          verifiedAt: guest.verifiedAt || null,
          checkedInAt: guest.checkedInAt || null,
          qrString: guest.qrString,
          status: status
        },
        actions: {
          canVerify: !guest.verified,
          canCheckIn: !guest.checkedIn,
          canVerifyAndCheckIn: !guest.verified && !guest.checkedIn
        }
      }
    };

    res.json(response);

  } catch (error) {
    console.error("💥 Scan QR Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while scanning QR code",
      error: error.message
    });
  }
};

/**
 * Verify Guest - Mark as verified
 */
exports.verifyGuest = async (req, res) => {
  try {
    const { qrString, verifiedBy } = req.body;

    console.log("🔐 Verify request for QR:", qrString?.substring(0, 20) + "...");

    if (!qrString) {
      return res.status(400).json({
        success: false,
        message: "QR code is required"
      });
    }

    const guest = await Guest.findOne({ qrString });

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    // Check if already verified
    if (guest.verified) {
      console.log("ℹ️ Guest already verified:", guest.fullName);
      return res.json({
        success: true,
        message: "Guest already verified",
        alreadyVerified: true,
        guest: formatGuestResponse(guest)
      });
    }

    // Update verification status
    guest.verified = true;
    guest.verifiedAt = new Date();
    if (verifiedBy) guest.verifiedBy = verifiedBy;
    
    await guest.save();

    console.log("✅ Guest verified:", guest.fullName);

    res.json({
      success: true,
      message: "Guest verified successfully",
      guest: formatGuestResponse(guest)
    });

  } catch (error) {
    console.error("💥 Verify Error:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message
    });
  }
};

/**
 * Check-in Guest - Mark as checked in
 */
exports.checkInGuest = async (req, res) => {
  try {
    const { qrString, checkedInBy } = req.body;

    console.log("🏁 Check-in request for QR:", qrString?.substring(0, 20) + "...");

    if (!qrString) {
      return res.status(400).json({
        success: false,
        message: "QR code is required"
      });
    }

    const guest = await Guest.findOne({ qrString });

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    // Check if already checked in
    if (guest.checkedIn) {
      console.log("ℹ️ Guest already checked in:", guest.fullName);
      return res.json({
        success: true,
        message: "Guest already checked in",
        alreadyCheckedIn: true,
        guest: formatGuestResponse(guest)
      });
    }

    // Update check-in status
    guest.checkedIn = true;
    guest.checkedInAt = new Date();
    if (checkedInBy) guest.checkedInBy = checkedInBy;
    
    // Auto-verify if not already verified
    if (!guest.verified) {
      guest.verified = true;
      guest.verifiedAt = new Date();
    }

    await guest.save();

    console.log("✅ Guest checked in:", guest.fullName);

    res.json({
      success: true,
      message: "Guest checked in successfully",
      guest: formatGuestResponse(guest)
    });

  } catch (error) {
    console.error("💥 Check-in Error:", error);
    res.status(500).json({
      success: false,
      message: "Check-in failed",
      error: error.message
    });
  }
};

/**
 * Verify and Check-in in one action
 */
exports.verifyAndCheckIn = async (req, res) => {
  try {
    const { qrString, actionBy } = req.body;

    console.log("⚡ Verify & Check-in for QR:", qrString?.substring(0, 20) + "...");

    if (!qrString) {
      return res.status(400).json({
        success: false,
        message: "QR code is required"
      });
    }

    const guest = await Guest.findOne({ qrString });

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    const updates = {};
    let message = "Action completed";

    // Update verification if needed
    if (!guest.verified) {
      updates.verified = true;
      updates.verifiedAt = new Date();
      if (actionBy) updates.verifiedBy = actionBy;
    }

    // Update check-in if needed
    if (!guest.checkedIn) {
      updates.checkedIn = true;
      updates.checkedInAt = new Date();
      if (actionBy) updates.checkedInBy = actionBy;
    }

    // Check if any updates are needed
    if (Object.keys(updates).length === 0) {
      console.log("ℹ️ Guest already verified and checked in:", guest.fullName);
      return res.json({
        success: true,
        message: "Guest already verified and checked in",
        alreadyDone: true,
        guest: formatGuestResponse(guest)
      });
    }

    // Apply updates
    await Guest.updateOne({ _id: guest._id }, { $set: updates });

    // Get updated guest
    const updatedGuest = await Guest.findById(guest._id).lean();

    console.log("✅ Guest verified & checked in:", guest.fullName);

    res.json({
      success: true,
      message: "Guest verified and checked in successfully",
      guest: formatGuestResponse(updatedGuest)
    });

  } catch (error) {
    console.error("💥 Bulk Action Error:", error);
    res.status(500).json({
      success: false,
      message: "Action failed",
      error: error.message
    });
  }
};

/**
 * Get verification statistics
 */
exports.getStats = async (req, res) => {
  try {
    console.log("📊 Getting verification statistics...");

    const total = await Guest.countDocuments();
    const verified = await Guest.countDocuments({ verified: true });
    const checkedIn = await Guest.countDocuments({ checkedIn: true });

    // Today's check-ins
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCheckIns = await Guest.countDocuments({
      checkedInAt: { $gte: today }
    });

    const stats = {
      totalGuests: total,
      verifiedGuests: verified,
      checkedInGuests: checkedIn,
      todaysCheckIns: todayCheckIns,
      pendingVerification: total - verified,
      pendingCheckIn: total - checkedIn
    };

    console.log("📈 Stats retrieved:", stats);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error("💥 Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get statistics",
      error: error.message
    });
  }
};

/**
 * Get all guests (for admin dashboard)
 */
exports.getAllGuests = async (req, res) => {
  try {
    const { 
      status = 'all', // all, verified, pending, checked-in
      category,
      limit = 50,
      page = 1 
    } = req.query;

    console.log("👥 Getting guests list:", { status, category, limit, page });

    const query = {};
    
    // Filter by status
    if (status === 'verified') query.verified = true;
    else if (status === 'pending') query.verified = false;
    else if (status === 'checked-in') query.checkedIn = true;
    
    // Filter by category
    if (category && ['REGULAR', 'VIP', 'VVIP'].includes(category)) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    
    const guests = await Guest.find(query)
      .select('fullName email seatNumber category verified checkedIn verifiedAt checkedInAt createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Guest.countDocuments(query);

    console.log(`✅ Retrieved ${guests.length} guests`);

    res.json({
      success: true,
      data: {
        guests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error("💥 Get Guests Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve guests",
      error: error.message
    });
  }
};

// Helper functions
function formatGuestResponse(guest) {
  let status = 'PENDING';
  if (guest.checkedIn) status = 'CHECKED_IN';
  else if (guest.verified) status = 'VERIFIED';

  return {
    id: guest._id,
    fullName: guest.fullName,
    email: guest.email,
    phone: guest.phone,
    gender: guest.gender,
    dob: guest.dob,
    category: guest.category,
    seatNumber: guest.seatNumber,
    verified: guest.verified || false,
    checkedIn: guest.checkedIn || false,
    verifiedAt: guest.verifiedAt,
    checkedInAt: guest.checkedInAt,
    status: status
  };
}