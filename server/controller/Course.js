const Category = require("../model/category");
const User = require("../model/user");
const Course = require("../model/courses");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");

// create course

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const { courseName, courseDescription, category, price, whatwillyoulearn } =
      req.body;

    // fetch file
    const thumbnail = req.files.imageFile;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !category ||
      !price ||
      !whatwillyoulearn ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check for instructor
    const instructor = await User.findById(req.user.id);
    console.log("Instructor : ", instructor);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // TODO: HW - catrgory and tags updation

    // check for tags
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "category is not available",
      });
    }

    // upload image to cloudinary
    const thumbnailDetails = await cloudinaryUpload(thumbnail, "studyNotion");
    console.log(thumbnailDetails);

    // create entry for new course
    const data = await Course.create({
      courseName,
      courseDescription,
      price,
      whatwillyoulearn,
      thumbnail: thumbnailDetails.secure_url,
      courseInstructor: instructor._id,
      category: categoryExists._id,
    });
    console.log("courseDetails: ", data);

    // add new course to instructor schema
    await User.findByIdAndUpdate(
      { _id: instructor._id },
      { $push: { courses: data._id } },
      { new: true }
    );
    // update tag ka schema

    await Category.findByIdAndUpdate(
      { _id: categoryExists._id },
      { $push: { courses: data._id } },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data,
    });
  } catch (error) {
    console.error("Error in creating course", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while creating course",
      error: error.message,
    });
  }
};

// getall courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        whatwillyoulearn: true,
        thumbnail: true,
        courseInstructor: true,
        tags: true,
        studentsEnroll: true,
        ratingAndreviews: true,
      }
    )
      .populate("courseInstructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching courses",
    });
  }
};

// get course details
exports.getCourseDetails = async (req, res) => {
  try {
    // const { id } = req.params;
    const _id = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Course id is required",
      });
    }

    const courseDetails = await Course.findById(_id)
      .populate("category")
      .populate("studentsEnroll")
      .populate({
        path: "courseInstructor",
        populate: { path: "additionalDetails" },
      })
      .populate({
        path: "courseSections",
        populate: {
          path: "subSections",
        },
      })
      .populate("ratingAndreviews")
      .exec();
    console.log(courseDetails);

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching course details",
      error: error.message,
    });
  }
};
