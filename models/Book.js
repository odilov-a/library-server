const mongoose = require("mongoose");

class Book {
  constructor() {
    this.model = mongoose.model("book", this._defineSchema());
  }

  _defineSchema() {
    return new mongoose.Schema(
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "author",
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
        },
        publisher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "publisher",
        },
        title: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        image: {
          type: Array,
          required: true,
        },
      },
      { timestamps: true }
    );
  }
}

module.exports = new Book().model;