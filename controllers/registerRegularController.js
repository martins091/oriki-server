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
      console.log("🔹 Generated QR string:", qrString);

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
      console.log("🔄 About to generate QR code...");
      let qrCodeDataURL;
      try {
        qrCodeDataURL = await generateQRCode(qrString);
        console.log("✅ QR code generated successfully");
        console.log("📏 QR code length:", qrCodeDataURL.length);
        console.log("🔍 QR code starts with:", qrCodeDataURL.substring(0, 50));
        console.log(
          "❓ Is valid data URL:",
          qrCodeDataURL.startsWith("data:image/png;base64,")
        );
      } catch (qrError) {
        console.error("❌ QR code generation failed:", qrError);
        // Fallback: create a simple data URL for testing
        qrCodeDataURL =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l5ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5PIFEgUiBDT0RFPC90ZXh0Pjwvc3ZnPg==";
      }

      // Build HTML - REMOVE qrCode parameter since we're using CID now
      const html = ticketTemplate({
        fullName: guest.fullName,
        seatNumber: guest.seatNumber,
        category: guest.category,
        // qrCode parameter removed - template will use cid:qrcode instead
      });

      // Send ticket email - PASS QR CODE DATA URL AS PARAMETER
      await sendTicketEmail(guest.email, "Your ÒRIKÌ 2025 Ticket", html, qrCodeDataURL);

      registeredGuests.push(guest);
    }

    return res.json({
      success: true,
      message: "Registration successful.",
      guests: registeredGuests,
    });
  } catch (error) {
    console.error("💥 Main function error:", error);
    return res.status(500).json({ error: error.message });
  }
};