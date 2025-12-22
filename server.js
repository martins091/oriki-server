require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

// ✅ Update CORS
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://rik-48x05sreo-martins-projects-2c1566a9.vercel.app",
  "https://v0-tastes-of-culture-website-ic27.vercel.app",
  "https://v0-tastes-of-culture-website.vercel.app/",
  "https://rik-five.vercel.app", // your Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

// ✅ Add these routes:
app.use("/api", require("./routes/registerRegular"));
app.use("/api/vip", require("./routes/vipAuth"));
app.use("/api/vip/register", require("./routes/vipRegister"));

// ✅ ADD VERIFICATION ROUTES HERE:
app.use("/api/verify", require("./routes/verifyQR"));

// ✅ Optional: Add a test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is working!",
    timestamp: new Date().toISOString(),
    endpoints: {
      register: "/api/register/regular",
      vip: "/api/vip/validate-code",
      vipRegister: "/api/vip/register",
      verification: {
        scan: "/api/verify/scan",
        verify: "/api/verify/verify",
        checkin: "/api/verify/checkin",
        stats: "/api/verify/stats",
        guests: "/api/verify/guests",
      },
    },
  });
});

// ✅ Add health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    serverTime: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("📡 Available endpoints:");
  console.log("   • POST /api/register/regular");
  console.log("   • POST /api/vip/validate-code");
  console.log("   • POST /api/vip/register");
  console.log("   • GET  /api/health (health check)");
  console.log("   • GET  /api/test (test endpoint)");
  console.log("🔍 Verification endpoints:");
  console.log("   • POST /api/verify/scan");
  console.log("   • POST /api/verify/verify");
  console.log("   • POST /api/verify/checkin");
  console.log("   • POST /api/verify/verify-checkin");
  console.log("   • GET  /api/verify/stats");
  console.log("   • GET  /api/verify/guests");
});
