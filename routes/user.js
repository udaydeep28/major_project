const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const errorHandler = require("../utils/errorHandler.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.showSignup);

router.post("/signup", errorHandler(userController.signup));

router.get("/login", userController.showLogin);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);

module.exports = router;
