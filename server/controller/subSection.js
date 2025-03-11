const section = require("../model/section");
const Section = require("../model/section");
const SubSection = require("../model/subSection");
const { cloudinaryUpload } = require("../utils/cloudinaryUpload");

// create subsection

exports.createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description } = req.body;

    // fetch video file
    const videoLink = req.files?.videoLink;
    // if (!video) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Video file is required",
    //   });
    // }
    console.log(sectionId, title, description, videoLink);

    // validate everything
    if (!sectionId || !title || !description || !videoLink) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video file
    const uploadVideo = await cloudinaryUpload(videoLink, "studyNotion");
    console.log(uploadVideo);

    // create subsection
    const subSection = await SubSection.create({
      title: title,
      videoDuration: `${uploadVideo.duration}`,
      description: description,
      videoLink: uploadVideo.secure_url,
    });

    // update section
    const updatedsection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: subSection._id } },
      { new: true }
    ).populate("subSections");

    // return respose
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: { updatedsection },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update subsection

exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, subSectionId, title, description } = req.body;
    const video = req.files?.videoLink;
    console.log(video, sectionId, subSectionId, title, description);
    // validate data
    if (!subSectionId || !title || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // update subsection
    const subSection = await SubSection.findById(subSectionId);
    if (video) {
      // upload video file
      const uploadVideo = await cloudinaryUpload(video, "studyNotion");
      subSection.videoLink = uploadVideo.secure_url;
    }
    subSection.title = title;
    subSection.description = description;
    subSection.videoDuration = `${uploadVideo.duration}`;
    await subSection.save();

    const updatedSection = await Section.findById(sectionId)
      .populate("subSections")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSection,
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
    const { subSectionId, sectionId } = req.body;

    // validate data
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID is required",
      });
    }
    await section.findByIdAndUpdate(sectionId, {
      $pull: {
        subSections: subSectionId,
      },
    });
    const deletedSubSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });
    // updated section
    const updateSection = await Section.findById(sectionId)
      .populate("subSections")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updateSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
