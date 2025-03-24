const Category = require("../model/category");
const User = require("../model/user");
const Course = require("../model/courses");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");

const subSection = require("../model/subSection");
const mongoose = require("mongoose");
// const section = require("../model/section");
const section = require("../model/section");

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
      tags: _tags,
      instructions: _instructions,
      state,
    } = req.body;
    const tags = JSON.parse(_tags);
    const instructions = JSON.parse(_instructions);

    console.log("tag", tags);
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
        !tags.length ||
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
      tags,
      instructions,
      thumbnail: thumbnailDetails.secure_url,
      courseInstructor: instructor._id,
      category: categoryExists._id,
      state: state,
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
    console.log("edit course wale route me hai");
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
        path: "courseInstructor",
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

exports.deleteCourse = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log("CourseId", _id);

    if (!_id) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    // Find the course
    const course = await Course.findById(_id).populate({
      path: "courseSections",
      populate: { path: "subSections" },
    });

    console.log("Course", course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    // const studentsEnrolled = course.studentsEnroll;
    // console.log("Students Enrolled", studentsEnrolled);
    // for (const studentId of studentsEnrolled) {
    //   await User.findByIdAndUpdate(studentId, {
    //     $pull: { courses: _id },
    //   });
    // }

    // Delete sections and sub-sections
    const courseSection = course.courseSections;
    for (const sectionId of courseSection) {
      // Delete sub-sections of the section
      const sections = await section.findById(sectionId);
      if (sections) {
        const subSections = sections.subSections;
        for (const subSectionId of subSections) {
          await subSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(_id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting course", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while deleting course",
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
      // .populate("ratingAndreviews")
      .exec();
    console.log(courseDetails);

    let totalDurationInSeconds = 0;
    courseDetails.courseSections.forEach((section) => {
      section.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.videoDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
      totalDurationInSeconds,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching course details",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body

    const instructorId = req.user.id;
    console.log(req.user.id);

    if (!instructorId) {
      return res.status(404).json({
        succes: false,
        message: "Instructor id is required",
      });
    }
    const instructorCourses = await Course.find({
      courseInstructor: instructorId,
    }).sort({ createdAt: -1 });
    if (instructorCourses.length) {
      return res.status(200).json({
        success: true,
        message: "Instructor's courses fetched successfully",
        data: instructorCourses,
      });
    }
  } catch (error) {
    console.error("Error in instructorCourse", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching instructor's courses",
      error: error.message,
    });
  }
};
