// utils/emailService.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendTicketEmail = async (
  email,
  subject,
  htmlContent,
  qrCodeDataURL // Now accepting QR code data URL directly
) => {
  try {
    // Convert base64 QR code to attachment
    const base64Data = qrCodeDataURL.split(',')[1]; // Remove the data:image/png;base64, part
    
    const attachments = [
      {
        content: base64Data,
        filename: 'qrcode.png',
        type: 'image/png',
        disposition: 'inline',
        content_id: 'qrcode' // This CID will be referenced in the HTML as src="cid:qrcode"
      }
    ];

    const msg = {
      to: email,
      from: process.env.SENDGRID_VERIFIED_SENDER,
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