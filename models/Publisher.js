const mongoose = require("mongoose");
const publisherSchame = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Publisher = mongoose.model("publisher", publisherSchame);
module.exports = Publisher;