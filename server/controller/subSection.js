const Section = require("../model/section");
const SubSection = require("../model/subSection");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");

// create subsection

exports.createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, videoDuration, description } = req.body;

    // fetch video file
    const video = req.files.videoFile;

    // validate everything
    if (!sectionId || !title || !videoDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video file
    const uploadVideo = await cloudinaryUpload(video, "studyNotion");

    // create subsection
    const subSection = await SubSection.create({
      title: title,
      videoDuration: videoDuration,
      description: description,
      videoLink: uploadVideo.secure_url,
    });

    // update section
    const updatedsection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: subSection._id } },
      { new: true }
    );

    // return respose
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: { subSection, updatedsection },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error while creating subsection",
      error: error.message,
    });
  }
};

// update subsection

exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId, title, description, videoDuration } = req.body;
    // validate data
    if (!subSectionId || !title || !description || !videoDuration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title: title,
        videoDuration: videoDuration,
        description: description,
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Error while updating subsection",
      error: error.message,
    });
  }
};
// delete subsection
exports.deleteSubsection = async (req, res) => {
  try {
    // fetch data
    const { subSectionID } = req.params;
    const _id = req.body;

    // validate data
    // if (!subSectionID) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Subsection ID is required",
    //   });
    // }

    const deletedSubSection = await SubSection.findByIdAndDelete(_id);

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: deletedSubSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error while deleting subsection",
    });
  }
};
