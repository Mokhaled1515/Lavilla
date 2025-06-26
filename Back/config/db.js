const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URL:", process.env.MONGO_URL); // ← هنا نطبع القيمة
    conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

