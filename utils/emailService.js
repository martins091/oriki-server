// utils/emailService.js
import nodemailer from "nodemailer";

export const sendTicketEmail = async (
  email,
  subject,
  htmlContent,
  attachments = []
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const mailOptions = {
      from: process.env.SENDGRID_VERIFIED_SENDER,
      to: email,
      subject,
      html: htmlContent,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};
