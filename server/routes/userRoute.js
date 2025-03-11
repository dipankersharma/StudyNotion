const express = require("express");
const route = express.Router();

// Importing controllers
const { login, sendOtp, changePassword } = require("../controller/Auth");
const { signup } = require("../controller/Signup");
const {
  resetPassword,
  resetpasswordToken,
} = require("../controller/ResetPassword");

const {
  authentication,
  isStudent,
  isInstructor,
} = require("../middleware/auth");
// signup routes
route.post("/signup", signup);
// login routes
route.post("/login", login);
// sendOtp routes
route.post("/sendOtp", sendOtp);
// changePassword routes
route.post("/changepassword", authentication, changePassword);
// reset password routes

route.post("/reset-password", resetPassword);
route.post("/reset-password-token", resetpasswordToken);

module.exports = route;
