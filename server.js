const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/router.js");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

const logDir = path.join(__dirname, "logs");
function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())}`;
}
function padNumber(num) {
  return num.toString().padStart(2, "0");
}
const logFilePath = path.join(logDir, `${getCurrentDateTime()}.mongodb.log`);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

mongoose.set("debug", function (collectionName, methodName, ...methodArgs) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${collectionName}.${methodName} ${JSON.stringify(methodArgs[0])} ${JSON.stringify(methodArgs[1])}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err.message));

app.use("/api", mainRouter);
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;