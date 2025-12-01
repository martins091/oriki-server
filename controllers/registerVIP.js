const VIPCode = require("../models/VIPCode");
const Seat = require("../models/Seat");
const Guest = require("../models/Guest");
const { v4: uuidv4 } = require("uuid");
const { sendTicketEmail } = require("../utils/emailService");
const { generateQRCode } = require("../utils/qrService");
const { ticketTemplate } = require("../utils/templates/ticketTemplate");

exports.registerVIP = async (req, res) => {
  try {
    const { code, fullName, email, phone, gender, dob, extraGuests } = req.body;

    if (!code || !fullName || !email || !phone || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: "All VIP fields (code, fullName, email, phone, gender, dob) are required."
      });
    }

    const vipCode = await VIPCode.findOne({ code: code.trim() });
    if (!vipCode || vipCode.used) {
      return res.status(400).json({ success: false, message: "Invalid or used code" });
    }

    const seat = await Seat.findOne({ category: vipCode.category, assigned: false });
    if (!seat) return res.status(400).json({ success: false, message: "No seat available" });

    const qrString = uuidv4();
    const vipGuest = new Guest({ fullName, email, phone, gender, dob, category: vipCode.category, seatNumber: seat.seatNumber, qrString });
    await vipGuest.save();

    seat.assigned = true;
    seat.assignedTo = vipGuest._id;
    await seat.save();

    vipCode.used = true;
    vipCode.usedBy = vipGuest._id;
    await vipCode.save();

    const qrCodeDataURL = await generateQRCode(qrString);
    const html = ticketTemplate({ fullName, seatNumber: seat.seatNumber, category: vipCode.category, qrCode: qrCodeDataURL });
    await sendTicketEmail(email, `Your ${vipCode.category} Ticket`, html, qrCodeDataURL);

    // Register extra guests as REGULAR
    let registeredExtras = [];
    if (extraGuests && extraGuests.length > 0) {
      for (let guestEmail of extraGuests) {
        const seatReg = await Seat.findOne({ category: "REGULAR", assigned: false });
        if (!seatReg) continue;

        const qrG = uuidv4();
        const extraGuest = new Guest({
          fullName: `Guest of ${fullName}`,
          email: guestEmail,
          category: "REGULAR",
          seatNumber: seatReg.seatNumber,
          qrString: qrG,
          dob: "2000-01-01",
          gender: "Not Specified",
          phone: "0000000000"
        });
        await extraGuest.save();

        seatReg.assigned = true;
        seatReg.assignedTo = extraGuest._id;
        await seatReg.save();

        const qrMail = await generateQRCode(qrG);
        const html2 = ticketTemplate({ fullName: extraGuest.fullName, seatNumber: seatReg.seatNumber, category: "REGULAR", qrCode: qrMail });
        await sendTicketEmail(guestEmail, "Your Regular Ticket", html2, qrMail);

        registeredExtras.push(extraGuest);
      }
    }

    return res.json({ success: true, message: "VIP registration completed", vipGuest, extraGuests: registeredExtras });

  } catch (error) {
    console.error("VIP Registration Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
