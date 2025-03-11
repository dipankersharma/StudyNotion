import React from "react";
import frameimg from "../../../assets/Images/frame.png";
import LogForm from "../Auth/LogForm";
import SignForm from "./SignForm";

const Template = ({ title, description1, description2, formtype, image }) => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="mx-auto w-11/12 flex md:flex-row flex-col-reverse gap-y-12 py-12 md:gap-y-0 md:gap-x-12 max-w-maxContent justify-between">
        {/* form description */}
        <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] leading-[2.375rem] font-semibold text-richblack-5 ">
            {title}
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] mt-4 flex flex-col">
            <span className="text-richblack-100 tracking-wide">{description1}</span>
            <span className="italic text-[16px] font-edu-sa text-blue-100 font-bold">
              {description2}
            </span>
          </p>

          {formtype === "signup" ? <SignForm /> : <LogForm />}
        </div>

        {/* image section */}
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 ">
          <img
            src={frameimg}
            alt="pattern"
            width={480}
            height={460}
            loading="lazy"
          />
          <img
            src={image}
            alt="Students"
            width={480}
            height={460}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
