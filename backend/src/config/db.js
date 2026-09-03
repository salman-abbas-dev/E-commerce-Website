// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Serverless environment mein multiple connections se bachne ke liye check
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // process.exit(1);  <-- Isey remove kar diya gaya hai taake server crash na ho
  }
};

module.exports = connectDB;