const {
  createUser,
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
  userLogin,
  user,
} = require("./userController");
const userRoutes = require("express").Router();
const { authenticateToken } = require("../middlewares/jwtAuthentication.js");

userRoutes.post("/createUser", createUser);
userRoutes.get("/getAllUsers", getAllUsers);
userRoutes.get("/getOneUser/:id", getOneUser);
userRoutes.patch("/editUser/:id", authenticateToken, editUser);
userRoutes.delete("/deleteUser/:id", deleteUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/", authenticateToken, user);

module.exports = { userRoutes };
