const mongoose = require("mongoose");
const studentSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    booked: {
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