import React from "react";
import { Link } from "react-router-dom";

const Button = ({ active, linkto, children }) => {
  return (
    <Link to={linkto}>
      <div
        className={`px-6 py-3 font-bold rounded-md text-[13px] text-center ${
          active ? "bg-yellow-50 text-black" : " bg-richblack-800"
        } hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
