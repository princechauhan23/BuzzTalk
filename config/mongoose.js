const mongoose = require("mongoose");
const env = require("./environment");

mongoose.set("strictQuery", false);
console.log("env",env)
mongoose.connect(`mongodb+srv://prince:${env.mongoDBpass}@cluster0.nuyf1.mongodb.net/test`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connecting to mongoDB"));

db.once("open", function () {
  console.log("Connected to the Database :: MongoDB");
});

module.exports = db;
