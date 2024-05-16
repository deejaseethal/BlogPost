const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader, "authHeader");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Authentication failed." });
  }
  jwt.verify(token, `${TOKEN_SECRET_KEY}`, (err, user) => {
    console.log("Error on token authentication", err);
    if (err) {
      return res.status(403).json({ message: "Authentication failed." });
    }
    console.log("user jwt", user);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
