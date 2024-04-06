const mongoose = require("mongoose");

class Category {
  constructor() {
    this.model = mongoose.model("category", this._defineSchema());
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

module.exports = new Category().model;