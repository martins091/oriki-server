const express = require("express");
const router = express.Router();
const { registerVIP } = require("../controllers/registerVIP");

// POST /api/vip/register
router.post("/", registerVIP);

module.exports = router;
