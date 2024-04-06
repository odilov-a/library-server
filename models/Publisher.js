const mongoose = require("mongoose");

class Publisher {
  constructor() {
    this.model = mongoose.model("publisher", this._defineSchema());
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

module.exports = new Publisher().model;