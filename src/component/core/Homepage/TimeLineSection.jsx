import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../../src/assets/Images/TimelineImage.png"

const TimeLineSection = () => {
  const timeline = [
    {
      Logo: logo1,
      heading: "Leadership",
      description: "Fully committed to success company",
    },
    {
      Logo: logo2,
      heading: "Responsibility",
      description: "Students will always be our top priority",
    },
    {
      Logo: logo3,
      heading: "Flexibility",
      description: "The ability to switch is an important skills",
    },
    {
      Logo: logo4,
      heading: "Solve the problem",
      description: "code your way to a solution",
    },
  ];

  return (
    <div className="flex flex-row gap-5 items-center">
      <div className=" w-[45%] flex flex-col gap-3 ">
        {timeline.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex gap-6">
              <div className="flex flex-row justify-center rounded-full shadow-xl  items-center w-[50px] h-[50px] bg-white ">
              <img src={item.Logo} alt="logo" />
              </div>
              <div className="flex flex-col text-left">
                <p className="font-bold text-[18px]">{item.heading}</p>
                <p  className="text-base">{item.description}</p>
              </div>
              </div>
              <div
                  className={`hidden ${
                    timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
            </div>
          );
        })}
      </div>


      <div className="relative shadow-[-20px_-20px_20px_-10px_rgba(173,216,230,0.9)]">
        <img src={TimeLineImage} alt="TimeLineImage" 
        className="object-cover shadow-white h-fit"/>

        <div className="absolute bg-caribbeangreen-700  flex flex-row gap-3 text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
           <div className="flex flex-row border-r border-caribbeangreen-300 items-center gap-5 px-7">
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm text-caribbeangreen-300 ">Year of Experience</p>
           </div>
           <div className="flex flex-row  items-center gap-5 px-7">
            <p className="text-3xl font-bold">250</p>
            <p className="text-sm text-caribbeangreen-300 ">Types of Courses</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
