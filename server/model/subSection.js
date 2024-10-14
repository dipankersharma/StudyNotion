const mongoose = require("mongoose");

const subSection = new mongoose.Schema({
  title: {
    type: String,
  },
  videoDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoLink: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subSection);
