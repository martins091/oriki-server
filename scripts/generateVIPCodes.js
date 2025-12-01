require("dotenv").config();
const mongoose = require("mongoose");
const VIPCode = require("../models/VIPCode");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function generateCodes() {
  const VIP_COUNT = 30;   // change these numbers
  const VVIP_COUNT = 10;

  const codes = [];

  for (let i = 1; i <= VIP_COUNT; i++) {
    const code = `VIP-ORIKI-${1000 + i}`;
    await VIPCode.create({ code, category: "VIP" });
    codes.push(code);
  }

  for (let i = 1; i <= VVIP_COUNT; i++) {
    const code = `VVIP-ORIKI-${2000 + i}`;
    await VIPCode.create({ code, category: "VVIP" });
    codes.push(code);
  }

  console.log("\nGenerated Codes:");
  console.log(codes.join("\n"));

  console.log("\nCopy these codes into a Word/Google document and share with your client.");
  process.exit();
}

generateCodes();
