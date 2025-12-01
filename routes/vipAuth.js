const express = require("express");
const VIPCode = require("../models/VIPCode");
const router = express.Router();

router.post("/validate-code", async (req, res) => {
  try {
    let { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ valid: false, message: "Code is required" });
    }

    code = code.trim(); // remove leading/trailing spaces

    const vip = await VIPCode.findOne({
      code: { $regex: `^${code}$`, $options: "i" }, // case-insensitive match
    });

    if (!vip) {
      return res.status(400).json({ valid: false, message: "Invalid code" });
    }

    if (vip.used) {
      return res
        .status(400)
        .json({ valid: false, message: "Code already used" });
    }

    return res.json({
      valid: true,
      category: vip.category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ valid: false, message: "Server error" });
  }
});
module.exports = router;
