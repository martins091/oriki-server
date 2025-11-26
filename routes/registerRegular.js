const express = require("express");
const router = express.Router();
const { registerRegular } = require("../controllers/registerRegularController");

router.post("/register/regular", registerRegular);

module.exports = router;
