const mongoose = require("mongoose");

class SuperUser {
  constructor() {
    this.model = mongoose.model("superUser", this._defineSchema());
  }

  _defineSchema() {
    return new mongoose.Schema(
      {
        login: {
          type: String,
          unique: true,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );
  }
}

module.exports = new SuperUser().model;