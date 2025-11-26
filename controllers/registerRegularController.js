const Seat = require("../models/Seat");
const Guest = require("../models/Guest");
const { v4: uuidv4 } = require("uuid");
const { sendConfirmationEmail } = require("../utils/emailService");
const { generateQRCode } = require("../utils/qrService");

exports.registerRegular = async (req, res) => {
  try {
    const { fullName, email, phone, gender, dob, numberOfSeats } = req.body;

    // 1. Find available regular seats
    const seats = await Seat.find({
      category: "REGULAR",
      assigned: false,
    }).limit(numberOfSeats);

    if (seats.length < numberOfSeats) {
      return res.status(400).json({
        message: "Not enough regular seats available.",
      });
    }

    let registeredGuests = [];

    for (let seat of seats) {
      // 2. Generate unique QR string
      const qrString = uuidv4();

      // 3. Create guest
      const guest = await Guest.create({
        fullName,
        email,
        phone,
        gender,
        dob,
        category: "REGULAR",
        seatNumber: seat.seatNumber,
        qrString,
      });

      // 4. Mark seat as assigned
      seat.assigned = true;
      seat.assignedTo = guest._id;
      await seat.save();

      // 5. Generate QR code and send email
      const qrCodeDataURL = await generateQRCode(guest.qrString);
      await sendConfirmationEmail(guest, qrCodeDataURL);

      registeredGuests.push(guest);
    }

    return res.json({
      success: true,
      message: "Registration successful.",
      seats: registeredGuests.map((g) => g.seatNumber),
      guests: registeredGuests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
