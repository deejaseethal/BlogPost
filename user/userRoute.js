const {
  createUser,
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
} = require("./userController");
const userRoutes = require("express").Router();

userRoutes.post("/createUser", createUser);
userRoutes.get("/getAllUsers", getAllUsers);
userRoutes.get("/getOneUser/:id", getOneUser);
userRoutes.patch("/editUser/:id", editUser);
userRoutes.delete("/deleteUser/:id", deleteUser);

module.exports = { userRoutes };
