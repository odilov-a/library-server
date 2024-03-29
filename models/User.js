const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", UserSchema);
module.exports = Users;