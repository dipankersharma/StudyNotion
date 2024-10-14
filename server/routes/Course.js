const express = require("express");
const routes = express.Router();

// Importing controllers
const {
  authentication,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middleware/auth");
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/section");

const {
  createSubSection,
  updateSubSection,
  deleteSubsection,
} = require("../controller/subSection");

const {
  createRatingAndReviews,
  gettingAverageRating,
  getAllRatingAndReviews,
  courseRatingAndReviews,
} = require("../controller/Rating&Review");

const {
  createCategory,
  getAllcategories,
  getCategoryDetails,
} = require("../controller/Category");
// Course routes

routes.post("/createCourse", authentication, isInstructor, createCourse);
routes.get("/getallCourses", getAllCourses);
routes.get("/getCourseDetails", getCourseDetails);

// section routes
routes.post("/createsection", authentication, isInstructor, createSection);
routes.put("/updatesection", updateSection);
routes.delete("/deletesection", deleteSection);

// sub sections routes
routes.post(
  "/createsubsection",
  authentication,
  isInstructor,
  createSubSection
);
routes.put("/updatesubsection", updateSubSection);
routes.delete("/deletesubsection", deleteSubsection);

// rating and reviews routes
routes.post("/createrating", authentication, isStudent, createRatingAndReviews);
routes.get("/getaveragerating", gettingAverageRating);
routes.get("/getallreviewsandratings", getAllRatingAndReviews);
routes.get("/courseratingandreviews", courseRatingAndReviews);

// category routes

routes.post("/createcategory", authentication, isAdmin, createCategory);
routes.get("/getallcategories", getAllcategories);
routes.get("/getcategoriespagedetails", getCategoryDetails);

module.exports = routes;
