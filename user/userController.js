const { UserModel } = require("./userModel");
const { mongoose } = require("mongoose");

const createUser = async (req, res) => {
  try {
    console.log("hii");
    const { firstName, lastName, userName, email } = req.body;
    if (!firstName || !lastName || !userName || !email) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userExist = await UserModel.find({ email });
    console.log(userExist.length, "userExist");
    if (userExist.length !== 0) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const newBlog = new UserModel({
      firstName,
      lastName,
      userName,
      email,
    });
    await newBlog.save();
    return res.status(200).json({ message: "New User Created", Data: newBlog });
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

module.exports = { createUser, getAllUsers, getOneUser, editUser, deleteUser };
