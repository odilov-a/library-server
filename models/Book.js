const mongoose = require("mongoose");
const bookSchame = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchame);
module.exports = Book;
