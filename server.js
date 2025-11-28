require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: "http://localhost:5173"  // your local frontend
}));
app.use(express.json());

app.use("/api", require("./routes/registerRegular"));

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
