// require("dotenv").config();
// const mongoose = require("mongoose");
// const Seat = require("./models/Seat");

// const MONGO_URL = process.env.MONGO_URL;

// mongoose.connect(MONGO_URL)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// async function seedSeats() {
//   try {
//     const seats = [];

//     // Create 150 REGULAR seats
//     for (let i = 1; i <= 150; i++) {
//       seats.push({
//         seatNumber: `REG-${i.toString().padStart(3, "0")}`,
//         category: "REGULAR",
//         assigned: false
//       });
//     }

//     // Create 30 VIP seats
//     for (let i = 1; i <= 30; i++) {
//       seats.push({
//         seatNumber: `VIP-${i.toString().padStart(3, "0")}`,
//         category: "VIP",
//         assigned: false
//       });
//     }

//     // Create 20 VVIP seats
//     for (let i = 1; i <= 20; i++) {
//       seats.push({
//         seatNumber: `VVIP-${i.toString().padStart(3, "0")}`,
//         category: "VVIP",
//         assigned: false
//       });
//     }

//     await Seat.insertMany(seats);
//     console.log("Seats seeded successfully");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error(err);
//     mongoose.connection.close();
//   }
// }

// seedSeats();
