import React from "react";
import { Link } from "react-router-dom";
import HighlightedText from "../component/core/Homepage/HighlightedText";
import CTAButton from "../component/core/Homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../component/core/Homepage/CodeBlocks";
const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto text-white w-11/12 max-w-maxContent text-center flex flex-col justify-between items-center">
        <Link to={"/signup"}>
          <div className=" group rounded-full mt-16 p-1 bg-richblack-800 mx-auto text-richblack-200 font-bold transition-all duration-300 hover:scale-95 w-fit shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex flex-row gap-2 items-center transition-all duration-300 rounded-full px-[13px] py-[4px] group-hover:bg-richblack-900 ">
              <p>Become an instructor</p>
              <i class="ri-arrow-right-line"></i>
            </div>
          </div>
        </Link>
        <div className="text-4xl mt-7 font-semibold">
          Empower Your Future With <HighlightedText text={"Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-richblack-300 font-semibold text-s">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, get access to a wealth of resources, including
          hands-on projects,quizzes and personalized feedback from the
          instructor.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton linkto={"/signup"} active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkto={"/login"} active={false}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="my-16 mx-5 relative shadow-[-10px_-20px_40px_-30px_rgba(173,216,230,0.6)]">
          <video
            muted
            autoPlay
            loop
            src={Banner}
            className="w-fit-content h-full shadow-[20px_20px_0px_-5px_rgba(255,255,255,0.9)]"
          ></video>
        </div>
        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold text-start">
                Unlock Your <HighlightedText text={"Coding Potential"} /> With
                Our Online Course
              </div>
            }
            subheading={
              "Our courses is designed and taught by industry experts who have year of experiences in coding and passionate about sharing their knowledge with you"
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              btntext: "Try it Yourself ",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              btntext: "Learn More",
            }}
            code={`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><linkrel="stylisheet"href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            codecolor={"text-yellow-25"}
          />
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold text-start">
                Start <HighlightedText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Ours hand-on learning environment means you'll be writing real code from very first session"
            }
            ctabtn1={{
              active: true,
              linkto: "/signup",
              btntext: "Continue Lesson ",
            }}
            ctabtn2={{
              active: false,
              linkto: "/login",
              btntext: "Learn More",
            }}
            code={`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><linkrel="stylisheet"href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            codecolor={"text-blue-25"}
          />
        </div>
      </div>

      {/* section 2 */}
      {/* section 3 */}
      {/* footer */}
    </div>
  );
};

export default Home;
