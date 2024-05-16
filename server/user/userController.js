const { UserModel } = require("./userModel");
const { mongoose } = require("mongoose");
const { generateAccessToken } = require("../utils/generateAccessToken.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    console.log("hii");
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userExist = await UserModel.find({ email });

    if (userExist.length !== 0) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = new UserModel({
          firstName,
          lastName,
          userName,
          email,
          password: hash,
        });
        await newUser.save();
        return res
          .status(200)
          .json({ message: "New User Created", Data: newUser });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allBlogs = await UserModel.find();
    if (!allBlogs) {
      return res.status(400).json({ message: "No User Data Found" });
    }
    return res
      .status(200)
      .json({ message: "All User Data Found", data: allBlogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not Valid" });
    }
    const userById = await UserModel.findById(id);
    if (userById.length === 0) {
      return res.status(400).json({ message: `User with ${id} not found` });
    }
    return res.status(200).json({ message: "User Data Found", Data: userById });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, userName } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Id Required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not Valid" });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: `No user with id ${id}` });
    }

    const editUser = await UserModel.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: `User Data Updated`, data: editUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id Required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Id is not Valid" });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const deleteUser = await UserModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: `Deletes User with id ${id}`, Data: deleteUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    let arr = await UserModel.find({ email });
    console.log("arr", arr);
    const user = arr[0];
    console.log("userlin123", user);
    console.log(user, "user");

    //console.log("Hii user", user);
    if (!user) {
      return res.status(404).json({ message: "User Doesn't Exist" });
    }
    // console.log("password", user.firstName);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const copyUser = { ...user.toObject() };
    console.log("Copy User", copyUser);
    console.log(user, "user");
    delete copyUser.password;
    console.log(copyUser, "copyUser");
    const accessToken = generateAccessToken(copyUser);
    // console.log(accessToken, "accessToken");
    return res.status(200).json({
      message: "Login succesfull",
      data: user._id,
      Token: accessToken,
    });
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

const user = async (req, res) => {
  try {
    console.log("RequestUser", req.user);
    return res
      .status(200)
      .json({ message: "UserData Returned", userData: req.user });
  } catch (error) {
    console.log({ message: "Error", error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
  userLogin,
  user,
};
