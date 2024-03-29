const mongoose = require("mongoose");
const studentSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchame);
module.exports = Student;