import React from "react";
import {FooterLink2} from "../data/footer-links";
import Logo from "../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const resource = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
  ];

  const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  return (
    <>
    <div className=" w-11/12 lg:flex-row max-w-maxContent mx-auto items-center justify-between flex flex-col mt-16 text-richblack-400 leading-6 py-14 relative">
      <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
        {/* section-1 */}
        <div className="flex flex-row w-[50%] gap-5  ">
          <div className=" flex flex-col gap-3 w-[30%]">
            <img src={Logo} alt="Logo" className="object-contain" />
            <h1 className="font-semibold text-richblack-50 text-[16px] ">
              Company
            </h1>
            <div className="flex flex-col gap-2">
              {["About", "Careers", "Affilates"].map((elem, index) => {
                return (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide"
                  >
                    <Link to={elem.toLowerCase()}>{elem}</Link>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row gap-2 text-lg">
              <i class="ri-facebook-circle-fill"></i>
              <i class="ri-google-fill"></i>
              <i class="ri-twitter-fill"></i>
              <i class="ri-youtube-fill"></i>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[30%] ml-2">
            <div className="flex flex-col gap-3 ">
              <h1 className="text-[16px] font-semibold text-richblack-100">
                Resources
              </h1>
              <div className="flex flex-col gap-2">
                {resource.map((elem, i) => {
                  return (
                    <div
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide"
                      key={i}
                    >
                      <Link to={elem.split(" ").join("-").toLowerCase()}>
                        {elem}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[16px] font-semibold text-richblack-100">
                  Support
                </h1>
                <p className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide">
                  Help center
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col ml-2 w-[30%]">
            <div className="flex flex-col gap-3 ">
              <h1 className="text-[16px] font-semibold text-richblack-100">
                Plans
              </h1>
              <div className="flex flex-col gap-2">
                {["Paid membership", "For students", "Business solutions"].map(
                  (elem, i) => {
                    return (
                      <div
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide"
                        key={i}
                      >
                        <Link to={elem.split(" ").join("-").toLowerCase()}>
                          {elem}
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[16px] font-semibold text-richblack-100">
                  Community
                </h1>
                <div className="flex flex-col gap-2">
                  {["Forums", "Chapters", "Events"].map((elem, i) => {
                    return (
                      <div
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide"
                        key={i}
                      >
                        <Link to={elem.toLowerCase()}>{elem}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section-2 */}

        <div className="flex w-[50%] gap-5 border-l border-richblack-700 px-3">
          {FooterLink2.map((elem, i) => {
            return (
              <div key={i} className="flex flex-col gap-3 w-[30%] ml-2 mb-7">
                <div className="flex flex-col gap-3 ">
                  <h1 className="text-[16px] font-semibold text-richblack-100">
                    {elem.title}
                  </h1>
                  <div className="flex flex-col gap-2">
                    {elem.links.map((elem, i) => {
                      return (
                        <div
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200 tracking-wide"
                          key={i}
                        >
                          <Link to={elem.link}>{elem.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      </div>

</>
    
  );
};

export default Footer;
