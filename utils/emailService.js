// utils/emailService.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendTicketEmail = async (
  email,
  subject,
  htmlContent,
  attachments = []
) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDGRID_VERIFIED_SENDER, // must be verified in SendGrid
      subject,
      html: htmlContent,
      attachments,
    };

    await sgMail.send(msg);

    console.log("Email sent successfully to", email);
    return true;
  } catch (error) {
    console.error("Email error:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
};
