const mongoose = require("mongoose");

class User {
  constructor() {
    this.model = mongoose.model("user", this._defineSchema());
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

module.exports = new User().model;