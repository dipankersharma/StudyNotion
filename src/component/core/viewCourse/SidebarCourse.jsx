import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbutton from "../../../common/Iconbutton";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

const SidebarCourse = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOflectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData?.length) return;
      
      const currentSectionIndex = courseSectionData.findIndex((data) => {
       
       return data._id === sectionId;
      });
     
      const currentSubsectionIndex = courseSectionData[
        currentSectionIndex
      ]?.subSections.findIndex((data) => {
       
        return data._id === subSectionId});
    
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubsectionIndex
        ]?._id;
     

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideobarActive(activeSubSectionId);
    })();
  }, [courseEntireData, courseSectionData, location.pathname]);
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* for buttons and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* buttons */}
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => navigate("/dashboard/enrolled-courses")}
              title="back"
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <IoIosArrowBack size={30} />
            </div>
            <div>
              <Iconbutton
                text={"Add Review"}
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>
          {/* heading */}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length}/{totalNoOflectures}
            </p>
          </div>
        </div>

        {/* Sections and subsections */}

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, idx) => (
            <div
              key={idx}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(section?._id)}
            >
              {/* section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <i
                    className={
                      activeStatus?.includes(section._id)
                        ? "rotate-180"
                        : "rotate-0"
                    }
                  >
                    <AiOutlineDown />
                  </i>
                </div>
              </div>
              {/* subsections */}
              <div>
                
                {activeStatus === section._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {section?.subSections?.map((subSection, i) => (
                      <div
                        key={i}
                        className={`flex gap-3  px-5 py-2 ${
                          
                          videobarActive === subSection._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        } `}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`
                          );
                          setVideobarActive(subSection._id);
                        }}
                      >
                       
                       {console.log("completedLectures", completedLectures)}
                        <input
                          type="checkbox"
                          checked={completedLectures?.includes(subSection?._id)}
                        />
                        <span>{subSection?.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarCourse;
