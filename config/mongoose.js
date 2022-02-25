const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/testing");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to mongoDB"));

db.once('open', function(){
    console.log("Connected to the Database :: MongoDB")
});

module.exports = db;