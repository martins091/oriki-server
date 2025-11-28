export const ticketTemplate = ({ fullName, seatNumber, category, qrCode }) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #fafafa;">

    <!-- Company Logo (hardcoded URL) -->
    <div style="text-align: center; margin-bottom: 25px;">
      <img 
        src="../public/logo.png" 
        alt="Company Logo" 
        style="width: 150px; max-width: 100%; object-fit: contain;" 
      />
    </div>

    <h2 style="text-align: center; color: #333; margin-top: 0;">
      🎟️ Your Event Ticket Is Ready!
    </h2>

    <p style="font-size: 15px; color: #444;">
      Hello <strong>${fullName}</strong>,
    </p>

    <p style="font-size: 15px; color: #444;">
      Thank you for registering for ÒRIKÌ 2025. Your seat has been successfully reserved.
    </p>

    <!-- Ticket Details -->
    <div style="
      background: #ffffff;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #e5e5e5;
      margin: 25px 0;
    ">
      <p style="font-size: 15px; margin: 5px 0;">
        <strong>Seat Number:</strong> ${seatNumber}
      </p>
      <p style="font-size: 15px; margin: 5px 0;">
        <strong>Category:</strong> ${category}
      </p>
    </div>

    <h3 style="margin-bottom: 10px;">Your QR Code</h3>

    <div style="text-align: center; margin-bottom: 20px;">
      <img 
        src="${qrCode}" 
        alt="qr-code" 
        style="width: 180px; height: 180px; border: 1px solid #ccc; padding: 5px; background: #fff;"
      />
    </div>

    <p style="font-size: 14px; color: #444;">
      Please show this QR code at the entrance during check-in.
    </p>

    <p style="margin-top: 30px; text-align: center; font-size: 14px; color: #333;">
      <strong>ÒRIKÌ 2025 – A Royal Dining Experience</strong><br/>
      Celebrating Nigeria's Heritage Through Food, Culture & Entertainment
    </p>

  </div>
`;
