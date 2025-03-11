const express = require("express");
const routes = express.Router();

// Importing controllers
const {
  updateProfile,
  getUserDetails,
  deleteAccount,
  updateProfilePicture,
  getEnrolledCourses,
} = require("../controller/Profile");

const {
  authentication,
  isAdmin,
  isStudent,
  isInstructor,
} = require("../middleware/auth");

// Routes

routes.put("/updateProfile", authentication, updateProfile);
routes.get("/getUserDetails", authentication, getUserDetails);
routes.delete("/deleteAccount", authentication, deleteAccount);
routes.put("/updateProfilePicture", authentication, updateProfilePicture);
routes.get("/getenrolledcourses", authentication, getEnrolledCourses);

module.exports = routes;
