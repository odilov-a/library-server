const mongoose = require("mongoose");
const categorySchame = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchame);
module.exports = Category;