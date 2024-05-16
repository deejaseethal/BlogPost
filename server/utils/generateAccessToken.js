const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

function generateAccessToken(payload) {
  return jwt.sign(payload, TOKEN_SECRET_KEY);
}

module.exports = { generateAccessToken };
