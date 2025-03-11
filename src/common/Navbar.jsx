import React, { useState } from "react";
import { Link, matchPath } from "react-router-dom";
import Logo from "../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDashboard from "../component/core/Auth/ProfileDashboard";
import { apiconnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { useEffect } from "react";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    const result = await apiconnector("GET", categories.CATEGORIES_URL);
    setSubLinks(result.data.data);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex justify-center items-center border-b-[1px] border-richblack-700 h-14">
      <div className="w-11/12 max-w-maxContent mx-auto flex items-center justify-between">
        {/* image */}
        <Link to={"/"}>
          <img width={160} height={40} src={Logo} loading="lazy" alt="" />
        </Link>

        {/* navlink */}
        <nav className="hidden md:block">
          <ul className="flex flex-row items-center justify-center gap-x-4">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <div className="flex items-center relative  text-richblack-25 group">
                    <p>{item.title}</p>
                    <i className="ri-arrow-down-s-line text-[20px]"></i>

                    <div className=" flex flex-col p-5 bg-richblack-5 w-[300px] invisible rounded-lg text-richblack-900 absolute left-[50%] top-[50%] opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 translate-x-[-50%] translate-y-[30%] group-hover:translate-y-[1.65em] z-10 ">
                      <div className="absolute h-6 w-6 rotate-45 left-[50%] top-0 translate-x-[63%]  translate-y-[-40%] bg-richblack-5 rounded"></div>

                      {subLinks.length ? (
                        subLinks.map((items, index) => (
                          <Link
                            className="px-[18px] py-[14px] rounded-lg bg-transparent hover:bg-richblack-100"
                            key={index}
                            to={`/catalog/${items.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <p>{items.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item?.path}
                    className={`${
                      matchRoute(item?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{item.title}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className=" hidden md:flex items-center gap-x-4">
          {user && user.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <i class="ri-shopping-cart-fill">
                {totalItems > 0 && <span>{totalItems}</span>}
              </i>
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 px-[12px] py-[8px] bg-richblack-800 text-richblack-100 rounded-md">
                log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 px-[12px] py-[8px] bg-richblack-800 text-richblack-100 rounded-md">
                sign in
              </button>
            </Link>
          )}
          {token !== null && <ProfileDashboard />}
        </div>
        <button className=" mr-4 md:hidden text-richblack-5 text-[24px] cursor-pointer">
          <i class="ri-menu-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
