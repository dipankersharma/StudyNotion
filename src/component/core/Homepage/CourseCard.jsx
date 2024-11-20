import React from "react";

function CourseCard({ courseData, currentcard, setcard }) {
  return (
    <div className="flex flex-col bg-richblack-800 w-[370px] h-[270px] cursor-pointer">
      <div className="flex flex-col p-6 ">
        <h2 className="text-[24px] font-medium text-left tracking-wide mb-3 text-white">
          {courseData.heading}
        </h2>
        <p className="text-pure-greys-400 text-[16px] h-[65px] tracking-wide text-left">
          {courseData.description}
        </p>
      </div>
      <div className="border-t-2 border-dashed border-pure-greys-400 mt-12 flex flex-row justify-between px-7 py-3">
        <div className=" flex justify-center gap-2 items-center text-pure-greys-400">
          <i class="ri-group-fill"></i>
          <p className="tracking-wide">{courseData.level}</p>
        </div>
        <div className="flex justify-center gap-2 items-center text-pure-greys-400">
          <i class="ri-todo-fill"></i>
          <p className="tracking-wide"> {courseData.lessionNumber} Lesson</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
