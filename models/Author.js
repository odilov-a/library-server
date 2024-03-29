const mongoose = require("mongoose");
const authorSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("author", authorSchame);
module.exports = Author;
