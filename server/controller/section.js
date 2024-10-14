const Section = require("../model/section");
const Course = require("../model/courses");

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
    );
    console.log(updatedCourseDetails);
    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: newSection,
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while creating section",
    });
  }
};

// update section

exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, sectionName } = req.body;
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
    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while creating section",
    });
  }
};

// delete section

exports.deleteSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId } = req.params;
    // validate
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section id is required",
      });
    }
    // delete section
    const deletedSection = await Section.findByIdAndDelete(sectionId);
    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: deletedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while deleting section",
    });
  }
};
