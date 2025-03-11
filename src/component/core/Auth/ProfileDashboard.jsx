import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../../services/operations/AuthOperation";
import { useOnClickOutside } from "../../../hook/useOnClickOutside";

const ProfileDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        ></img>
        <i class="ri-arrow-down-s-fill text-richblack-100 text-lg"></i>
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-[-25px] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to={"/dashboard/my-profile"} onClick={() => setOpen(false)}>
            <div
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 
            hover:text-richblack-25 "
            >
              <i class="ri-profile-line"></i>
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <i class="ri-logout-circle-line"></i>
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDashboard;
