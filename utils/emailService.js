const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(guest) {
  // Generate QR code as a buffer
  const qrBuffer = await QRCode.toBuffer(guest.qrString, {
    type: "png",
    width: 300,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: guest.email,
    subject: "ÒRIKÌ 2025 - Your Event Registration Confirmation",
    html: `
      <h1>ÒRIKÌ 2025</h1>
      <h3>A Royal Dining Experience</h3>
      <p>Celebrating Nigeria's Rich Heritage Through Food, Culture & Entertainment</p>
      <hr />
      <h2>Hi ${guest.fullName},</h2>
      <p>Your registration is successful!</p>
      <p><strong>Seat Number:</strong> ${guest.seatNumber}</p>
      <p><strong>Category:</strong> ${guest.category}</p>
      <p>Please present the attached QR code at the entrance:</p>
      <hr />
      <p>We look forward to seeing you!</p>
    `,
    attachments: [
      {
        filename: "qr-code.png",
        content: qrBuffer,
        cid: "qrCode", // optional, for inline embedding if needed
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };
