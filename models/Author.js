const mongoose = require("mongoose");

class Author {
  constructor() {
    this.model = mongoose.model("author", this._defineSchema());
  }

  _defineSchema() {
    return new mongoose.Schema(
      {
        title: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );
  }
}

module.exports = new Author().model;