const Category = require("../model/category");
const User = require("../model/user");
const Course = require("../model/courses");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");

// create course

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      category,
      price,
      whatwillyoulearn,
      tag: _tags,
      instructions: _instructions,
      state,
    } = req.body;
    const tag = JSON.parse(_tags);
    const instructions = JSON.parse(_instructions);

    console.log("tag", tag);
    console.log("instructions", instructions);
    // fetch file
    const thumbnail = req.files.thumbnail;
    console.log("thumbnail", thumbnail);

    // validation
    if (
      (!courseName ||
        !courseDescription ||
        !category ||
        !price ||
        !whatwillyoulearn ||
        !thumbnail ||
        !tag.length ||
        !instructions.length,
      !state)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!state || state === undefined) {
      state = "Draft";
    }
    // check for instructor
    const instructor = await User.findById(req.user.id, {
      accountType: "instructor",
    });
    console.log("Instructor : ", instructor);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // TODO: HW - catrgory and tags updation

    // check for tags
    const categoryExists = await Category.findById(category);
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
// update courses
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // if thumbnail are available to update

    if (updates.thumbnail) {
      // upload image to cloudinary
      const thumbnailDetails = await cloudinaryUpload(
        updates.thumbnail,
        process.env.FOLDER_NAME
      );
      updates.thumbnail = thumbnailDetails.secure_url;
    }

    for (var key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tags" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();
    const updateCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseSections",
        populate: {
          path: "sectionName",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    console.error("Error in updating course", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while updating course",
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
