const CourseProgress = require("../model/courseProgress");
const SubSection = require("../model/subSection");

exports.courseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  //   check if subsection is valid
  try {
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }
    // check if course progress exists for the user and subsection
    const courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(404).json({ error: "Subsection already completed" });
      }
      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId);
      // Save the updated course progress
      await courseProgress.save();

      return res.status(200).json({
        success: true,
        message: "Course progress updated",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
