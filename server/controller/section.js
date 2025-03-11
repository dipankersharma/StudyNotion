const Section = require("../model/section");
const Course = require("../model/courses");
const subSection = require("../model/subSection");

// create section

exports.createSection = async (req, res) => {
  try {
    // fetch data
    const { courseId, sectionName } = req.body;
    // validate
    if (!courseId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // create section
    const newSection = await Section.create({
      sectionName,
    });
    // update course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseSections: newSection._id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "courseSections",
      populate: {
        path: "subSections",
      },
    });
    console.log(updatedCourseDetails);
    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update section

exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, sectionName, courseId } = req.body;
    // validate
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      {
        new: true,
      }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseSections",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: updatedSection,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete section

exports.deleteSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, courseId } = req.body;
    // validate
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseSections: sectionId,
      },
    });

    await subSection.deleteMany({ _id: { $in: subSection.subSection } });
    // delete section
    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId)
      .populate({
        path: "courseSections",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error while deleting section:${error.message}`,
    });
  }
};
