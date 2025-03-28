const Profile = require("../model/profile");
const User = require("../model/user");
const Course = require("../model/courses");
const cloudinary = require("cloudinary").v2;
const courseProgress = require("../model/courseProgress");

// update profile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const { firstName, lastName, dateOfBirth, contactNumber, gender, about } =
      req.body;
    const id = req.user.id;

    // validate data
    if (!contactNumber || !gender || !about || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find user by id
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();
    // find profile id
    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    await profileDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete account

exports.deleteAccount = async (req, res) => {
  try {
    // fetch data
    const id = req.user.id;

    // validate data
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }

    // find user by id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const profileId = userDetails.additionalDetails;

    // delete profile
    await Profile.findByIdAndDelete(profileId);
    // unenroll user from all enroll courses
    const user = await User.findById(id).populate("courses").exec();
    const userEnrolledCourse = user.courses;

    userEnrolledCourse.map((item, index) => {
      Course.findByIdAndUpdate(
        item._id,
        { $pull: { studentsEnroll: user } },
        { new: true }
      ).exec();
    });

    user.courses = [];
    await user.save();

    // delete user
    await User.findByIdAndDelete(id);

    // response
    return res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error while deleting account",
      error: error.message,
    });
  }
};

// get userDetails

exports.getUserDetails = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }
    const userDetails = await User.findById(user)
      .populate("additionalDetails")
      .exec();
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // response
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching user details",
    });
  }
};

async function cloudinaryUploadImage(file, folder) {
  const options = { folder };
  options.resource_type = "auto";

  // console.log(file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
const validatesize = (file) => {
  return file < 500000; // 500kb
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const userID = req.user.id;
    const file = req.files.profilePicture;

    if (!userID || !file) {
      return res.status(400).json({
        success: false,
        message: "User id and profile picture are required",
      });
    }
    // validatae image

    const supportedImageTypes = ["jpeg", "png", "jpg"];
    const imageType = file.name.split(".")[1].toLowerCase();

    // const imageSize = file.size;
    // console.log(imageSize);
    // if (!validatesize(imageSize)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Image size should be less than 500kb",
    //   });
    // }

    if (!supportedImageTypes.includes(imageType)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported image type. Only JPEG, PNG, and JPG are allowed.",
      });
    }
    // upload image to cloudinary
    const Result = await cloudinaryUploadImage(file, "studyNotion");
    console.log(Result);
    // update user profile picture
    const user = await User.findByIdAndUpdate(
      userID,
      { image: Result.secure_url },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile picture updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while updating profile picture",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById({ _id: userId })
      .populate({
        path: "courses",
        populate: { path: "courseSections", populate: { path: "subSections" } },
      })
      .exec();

    userDetails = userDetails.toObject();
    var subSectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      var totalDurationsInSeconds = 0;
      subSectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseSections.length; j++) {
        totalDurationsInSeconds += userDetails.courses[i].courseSections[
          j
        ].subSections.replace((acc, curr) => acc + curr.videoDuration, 0);
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationsInSeconds
        );
        subSectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await courseProgress.findOne({
        userId: userId,
        courseId: userDetails.courses[i]._id,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (subSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 0;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching enrolled courses: " + error.message,
    });
  }
};
