import React from "react";
import HighlightedText from "../Homepage/HighlightedText";
import know_your_progress from "../../../assets/Images/know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAbutton from "../Homepage/Button"
const LearningLanguageSection = () => {
  return (
    <div>
    <div className="text-4xl font-semibold text-center mt-16">
      Your swiss knife for{" "}
      <HighlightedText text={"learning any language"} />
    </div>
    <div className="text-richblack-600 font-medium text-center lg:w-[65%] text-base mx-auto mt-3">
      Using spin making learning multiple languages easy. with 20+ languages
      realistic voice-over,progress tracking, custom schedule and more.
    </div>
    <div className="flex items-center justify-center mt-8 flex-col lg:flex-row lg:mt-0">
      <img src={know_your_progress} alt="" className="fit-contain lg:-mr-32" />
      <img src={Compare_with_others} alt="" className="fit-contain lg:-mb-10 lg:-mt-0 -mt-12" />
      <img src={Plan_your_lessons} alt="" className="fit-contain lg:-ml-36 lg:-mt-5 -mt-20" />
    </div>
    <div className="w-fit mx-auto mt-5 mb-10 lg:mb-20">
      <CTAbutton active={true} linkto={"/signup"}>
      Learn More</CTAbutton>
    </div>
  </div>
  );
};

export default LearningLanguageSection;
