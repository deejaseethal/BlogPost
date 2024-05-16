const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");

const { connectDB } = require("./connectDB");
const { blogRoutes } = require("./blog/blogRoute");
const { userRoutes } = require("./user/userRoute");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use("/api", blogRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
