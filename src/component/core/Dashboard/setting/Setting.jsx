import React from "react";
import { useSelector } from "react-redux";
import UpdateProfilePicture from "./UpdateProfilePicture";
import ProfileUpdate from "./ProfileUpdate";
import ResetPassword from "./ResetPassword";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {
  return (
    <div className="mx-auto  w-11/12 min-h-[100vh]">
      <h1 className="text-richblack-5 mb-10 font-semibold text-2xl">
        My Profile
      </h1>
      {/* profile picture update */}
      <UpdateProfilePicture />
      {/* profile Information */}
      <ProfileUpdate />
      {/* reset password */}
      <ResetPassword />
      {/* delete account */}
      <DeleteAccount />
    </div>
  );
};

export default Setting;
