const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/blogPost");
  console.log("Database Connected Successfully");
};
module.exports = { connectDB };
