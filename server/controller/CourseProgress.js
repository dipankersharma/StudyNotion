const { default: mongoose } = require("mongoose");
const CourseProgress = require("../model/courseProgress");
const SubSection = require("../model/subSection");

// exports.courseProgress = async (req, res) => {
//   const { courseId, subsectionId } = req.body;
//   const userId = req.user.id;

//   //   check if subsection is valid
//   try {
//     const subsection = await SubSection.findById(subsectionId);
//     if (!subsection) {
//       return res.status(404).json({
//         success: false,
//         message: "Subsection not found",
//       });
//     }
//     console.log("courseId", courseId);
//     console.log("userId", userId);
//     // check if course progress exists for the user and subsection
//     const courseProgress = await CourseProgress.findOne({
//       courseId:courseId,
//       userId:userId,
//     });
//     if (!courseProgress) {
//       // If course progress doesn't exist, create a new one
//       return res.status(404).json({
//         success: false,
//         message: "Course progress not found",
//       });
//     } else {
//       // If course progress exists, check if the subsection is already completed
//       if (courseProgress.completedVideos.includes(subsectionId)) {
//         return res.status(404).json({ error: "Subsection already completed" });
//       }
//       // Push the subsection into the completedVideos array
//       courseProgress.completedVideos.push(subsectionId);
//       // Save the updated course progress
//       await courseProgress.save();

//       return res.status(200).json({
//         success: true,
//         message: "Course progress updated",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.courseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // 1. Validate subsection
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // 2. Find or create course progress
    let courseProgress = await CourseProgress.findOne({
      courseId: new mongoose.Types.ObjectId(courseId), // ✅ same as model
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!courseProgress) {
      // If not found, create one with this video completed
      courseProgress = await CourseProgress.create({
        courseId,
        userId,
        completedVideos: [subsectionId],
      });

      return res.status(201).json({
        success: true,
        message: "Course progress created and subsection marked completed.",
      });
    }

    // 3. Check if already completed
    const alreadyCompleted = courseProgress.completedVideos.some(
      (id) => id.toString() === subsectionId.toString()
    );

    if (alreadyCompleted) {
      return res.status(409).json({
        success: false,
        message: "Subsection already completed",
      });
    }

    // 4. Push and save
    courseProgress.completedVideos.push(subsectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress updated",
    });
  } catch (error) {
    console.error("Course Progress Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
