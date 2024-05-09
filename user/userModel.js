const mongoose = require("mongoose");
const { Schema } = mongoose;

userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
