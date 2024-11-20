import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
import CourseCard from "./CourseCard";
const Exploremore = () => {
  const Tabsname = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills path",
    "Career path",
  ];

  const [currenttab, setcurrenttab] = useState(Tabsname[0]);
  const [course, setcourse] = useState(HomePageExplore[0].courses);
  const [currentcard, setcurrentcard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const changecard = (value) => {
    setcurrenttab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setcourse(result[0].courses);
    setcurrentcard(result[0].courses[0].heading);
  };

  return (
    <div >
      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightedText text={"power of code"} />
      </div>
      <p className="text-richblack-300 text-center text-sm text-[16px] font-semibold mt-3">
        Learn to build anything you can imagine
      </p>
      <div className="flex flex-row bg-richblack-800 gap-2 rounded-full border-richblack-100 py-1 px-2 mt-3">
        {Tabsname.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row items-center gap-2 py-2 px-7 text-[14px] font-semibold rounded-full  transition-all duration-200 ${
              currenttab === item
                ? "bg-richblack-900 text-richblack-50 font-medium"
                : "text-richblack-200 "
            } hover:bg-richblack-900 hover:text-richblack-5 cursor-pointer`}
            onClick={() => changecard(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="lg:h-[150px]">
      <div className="absolute left-0 flex flex-row w-full p-3 mt-8 justify-between ">
        {course.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              courseData={ele}
              currentcard={currentcard}
              setcard={setcurrentcard}
            />
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Exploremore;
