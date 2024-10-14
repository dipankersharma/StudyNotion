const ratingAndReviews = require("../model/ratingAndreviews");
const Course = require("../model/courses");
const User = require("../model/user");

// creating rating and reviews
exports.createRatingAndReviews = async (req, res) => {
  try {
    // fetch data
    const { rating, review, _id } = req.body;
    // const { id } = req.params;

    const userID = req.user.id;

    // validate data
    if (!rating || !review || !_id || !userID) {
      return res.status(400).json({
        success: false,
        message: "Rating, review, userId and course id are required",
      });
    }

    // find course by id
    const courseDetails = await Course.findById({
      _id,
      studentsEnroll: { $elemMatch: { $eq: userID } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course details not found",
      });
    }
    //   validate user

    const userDetails = await User.findById({ _id: userID });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // check is user already reviewed course
    const existingReview = await ratingAndReviews.findOne({
      user: userID,
      course: _id,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "User already reviewed this course",
      });
    }
    // creating rating and review

    const newRatingAndReview = await ratingAndReviews.create({
      rating,
      review,
      user: userDetails._id,
    });

    // add rating and review to course
    await Course.findByIdAndUpdate(
      _id,
      { $push: { ratingAndreviews: newRatingAndReview._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      data: newRatingAndReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while creating rating and review",
      error: error.message,
    });
  }
};

// geting average rating

exports.gettingAverageRating = async (req, res) => {
  try {
    // const { id } = req.params;
    const _id = req.body;
    const courseDetails = await Course.findById(_id)
      .populate("ratingAndreviews")
      .exec();
    const rating = courseDetails.ratingAndreviews.map(
      (rating) => rating.rating
    );
    console.log(rating);
    const totalRatings = rating.reduce((acc, rating) => acc + rating, 0);
    console.log(totalRatings);

    const averageRating = totalRatings > 0 ? totalRatings / rating.length : 0;
    console.log(averageRating);

    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      data: averageRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching average rating",
    });
  }
};

// geting all rating and reviews for a course

exports.courseRatingAndReviews = async (req, res) => {
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
      .populate("ratingAndreviews")
      .exec();

    if (!courseDetails.ratingAndreviews) {
      return res.status(404).json({
        success: false,
        message: "No rating and reviews found for this course",
      });
    }

    const allRatingAndReviews = courseDetails.ratingAndreviews.map(
      (rating) => rating
    );
    console.log(allRatingAndReviews);

    return res.status(200).json({
      success: true,
      message: "All rating and reviews fetched successfully",
      data: allRatingAndReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching all rating and reviews",
    });
  }
};

// get all rating and reviews

exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const ratingReview = await ratingAndReviews
      .find({})
      .sort({ rating: "desc" })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    if (!ratingReview) {
      return res.status(404).json({
        success: false,
        message: "No rating and reviews found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All rating and reviews fetched successfully",
      data: ratingReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while fetching all rating and reviews",
    });
  }
};
