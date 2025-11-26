const QRCode = require("qrcode");

async function generateQRCode(qrString) {
  return await QRCode.toDataURL(qrString); // Returns base64 QR code
}

module.exports = { generateQRCode };
