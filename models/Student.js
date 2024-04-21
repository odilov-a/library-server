const mongoose = require("mongoose");

class Student {
  constructor() {
    this.model = mongoose.model("student", this._defineSchema());
  }

  _defineSchema() {
    return new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          unique: true,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        booked: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
        },
      },
      { timestamps: true }
    );
  }
}

module.exports = new Student().model;