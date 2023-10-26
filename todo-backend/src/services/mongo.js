const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGODB_CONNECT;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  res.status(500).json({ Error: "Connection to database failed" });
});

async function mongoConnect() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
