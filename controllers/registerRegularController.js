import Seat from "../models/Seat.js";
import Guest from "../models/Guest.js";
import { v4 as uuidv4 } from "uuid";
import { sendTicketEmail } from "../utils/emailService.js";
import { generateQRCode } from "../utils/qrService.js";
import { ticketTemplate } from "../utils/templates/ticketTemplate.js";

export const registerRegular = async (req, res) => {
  try {
    const { fullName, email, phone, gender, dob, numberOfSeats } = req.body;

    // Find available regular seats
    const seats = await Seat.find({
      category: "REGULAR",
      assigned: false,
    }).limit(numberOfSeats);

    if (seats.length < numberOfSeats) {
      return res
        .status(400)
        .json({ message: "Not enough regular seats available." });
    }

    let registeredGuests = [];

    for (let seat of seats) {
      const qrString = uuidv4();

      // Create guest
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

      // Mark seat as assigned
      seat.assigned = true;
      seat.assignedTo = guest._id;
      await seat.save();

      // Generate QR code
      const qrCodeDataURL = await generateQRCode(qrString);

      // Build HTML (logo is hardcoded in template now)
      const html = ticketTemplate({
        fullName: guest.fullName,
        seatNumber: guest.seatNumber,
        category: guest.category,
        qrCode: qrCodeDataURL,
      });

      // Send ticket email
      await sendTicketEmail(guest.email, "Your ÒRIKÌ 2025 Ticket", html);

      registeredGuests.push(guest);
    }

    return res.json({
      success: true,
      message: "Registration successful.",
      guests: registeredGuests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
