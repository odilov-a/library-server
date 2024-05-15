const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/router.js");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3003;
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("db error", err.message));

app.use(cors());

app.use("/api", mainRouter);
app.use("/uploads", express.static("uploads"));
app.listen(process.env.PORT || 3003, () =>
  console.log(`server is running ${PORT}`)
);

module.exports = app;