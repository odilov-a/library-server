const mongoose = require("mongoose");

class Order {
  constructor() {
    this.model = mongoose.model("order", this._defineSchema());
  }

  _defineSchema() {
    return new mongoose.Schema(
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
        },
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "student",
        },
        take: {
          type: Date,
          required: true,
        },
        give: {
          type: Date,
          required: true,
        },
      },
      { timestamps: true }
    );
  }
}

module.exports = new Order().model;