const express = require("express");
const router = express.Router();
const passport = require("passport");
const { route } = require(".");

const usercontroller = require("../controllers/user_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usercontroller.profile
);
router.post("/update/:id", passport.checkAuthentication, usercontroller.update);

// Sign In Sign Up routes
router.get("/sign-up", usercontroller.signUp);
router.get("/sign-in", usercontroller.signIn);

router.post("/create", usercontroller.create);
// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usercontroller.createSession
);
// "usercontroller.createSession" this controller is called when passport authenticate
// checks all the validation

router.get("/sign-out", usercontroller.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usercontroller.createSession
);

module.exports = router;
