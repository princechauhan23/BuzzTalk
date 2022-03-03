const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller")

console.log("router loaded!");

// Routes for different controllers
router.get("/",homeController.home);
router.get("/practice",homeController.practice);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));


module.exports = router;