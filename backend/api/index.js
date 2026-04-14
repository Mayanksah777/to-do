const dotenv = require("dotenv");
const app = require("../app");
const connectDB = require("../config/db");

dotenv.config();

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Serverless initialization failed:", error.message);
    return res.status(500).json({
      message: "Server initialization failed",
      details: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};
