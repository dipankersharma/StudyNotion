const mongoose = require("mongoose");

const section = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

module.exports = mongoose.model("Section", section);
