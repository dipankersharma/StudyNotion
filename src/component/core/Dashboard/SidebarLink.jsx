import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";
const SidebarLink = ({ link }) => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div>
      <NavLink
        to={link.path}
        className={`${
          matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
        } relative px-8 py-2 font-medium text-sm flex `}
      >
        <span
          className={`absolute h-full top-0 left-0 bg-yellow-50 w-[0.2rem] ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
          }`}
        ></span>
        <div className="flex items-center gap-x-2 text-richblack-100 w-full">
          <i className={`${link.icon} text-lg`}></i>
          {link.name}
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
