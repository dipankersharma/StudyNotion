import React from "react";

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

  return (
    <div className=" w-11/12 lg:flex-row max-w-maxContent mx-auto items-center justify-between flex flex-col mt-16 text-richblack-400 leading-6 py-14 relative">
      <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
        {/* section-1 */}
        <div className="flex flex-row w-[50%] gap-5 border-r border-richblack-700">
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
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200"
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
          <div className="flex flex-col gap-3 w-[30%]">
            <div className="flex flex-col gap-3 tracking-5">
              <h1 className="text-[18px] font-semibold text-richblack-100">
                Resources
              </h1>
              <div className="flex flex-col gap-2">
                 {resource.map((elem,i)=>{
                    <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all diration-200" key={i}>
                         <Link to={elem.split(" ").join("-").toLowerCase()}>{elem}</Link>
                    </div>
                 })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
