import React from "react";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course information",
    },
    {
      id: 2,
      title: "Course builder",
    },
    {
      id: 3,
      title: "Publisher",
    },
  ];
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center overflow-x-hidden">
        {steps.map((items, index) => (
          <>
            <div className="flex flex-col items-center " key={index}>
              <button
                className={` grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px]${
                  step === items.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }  ${step > items.id && "bg-yellow-50 text-yellow-50"}`}
              >
                {" "}
                {step > items.id ? (
                  <i class="ri-check-double-line font-bold text-richblack-900"></i>
                ) : (
                  items.id
                )}
              </button>
            </div>
            {items.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > items.id
                      ? "border-yellow-50"
                      : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item, ind) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={ind}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
