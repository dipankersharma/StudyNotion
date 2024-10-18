import React from "react";
import HighlightedText from "../Homepage/HighlightedText";
import know_your_progress from "../../../assets/Images/know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAbutton from "../Homepage/Button"
const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px]">
      <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold text-center">
          Your swiss knife for{" "}
          <HighlightedText text={"learning any language"} />
        </div>
        <div className="text-richblack-600 font-medium text-center w-[65%] mt-4 text-base mx-auto">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over,progress tracking, custom schedule and more.
        </div>
        <div className="flex items-center justify-center mt-5 flex-row">
          <img src={know_your_progress} alt="" className="fit-contain -mr-32" />
          <img src={Compare_with_others} alt="" className="fit-contain" />
          <img src={Plan_your_lessons} alt="" className="fit-contain -ml-36" />
        </div>
        <div className="w-fit mt-5 mb-10">
          <CTAbutton active={true} linkto={"/signup"}>
          Learn More</CTAbutton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
