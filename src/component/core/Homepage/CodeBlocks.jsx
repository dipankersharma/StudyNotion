import React from "react";
import Button from "./Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  code,
  codecolor,
  backgroundgradient,
}) => {
  return (
    <div className={`flex ${position} gap-10 my-20 justify-between `}>
      {/* section1 */}
      <div className="flex flex-col w-[50%]">
        {heading}
        <div className="text-richblack-300 mt-4 font-bold text-start">
          {subheading}
        </div>
        <div className="flex gap-8 mt-16">
          <Button active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btntext}
              <i class="ri-arrow-right-line"></i>
            </div>
          </Button>
          <Button active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </Button>
        </div>
      </div>
      {/* section2 */}
      <div className="h-fit code-border code-border flex flex-row text-[15px] relative w-[100%] py-2 lg:w-[500px] ]">
        {backgroundgradient}
        <div className="flex flex-col text-center font-inter font-bold text-richblack-300 w-[10%] ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-2 text-start`}
        >
          <TypeAnimation
            sequence={[code, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
