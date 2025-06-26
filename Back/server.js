const dotenv = require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const roomsRoutes = require("./routes/roomRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;
const bookingRoutes = require("./routes/bookingRoutes");

//connect to database
connectDB();

//setup middleware

app.use(express.json());

app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));
