import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  console.log(user.additionalDetails.about);

  return (
    <div className="w-11/12 mx-auto ">
      <h1 className="text-richblack-5 font-semibold text-2xl">My Profile</h1>

      {/* section1 */}
      <div className=" mx-auto flex bg-richblack-800 mt-5 px-7 py-8 rounded-lg justify-between">
        <div className="flex items-center gap-2">
          <img
            src={user.image}
            className="aspect-square w-[50px] rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-richblack-5 font-semibold text-sm">
              {user.firstName + " " + user.lastName}
            </p>
            <p className="text-richblack-200 text-sm font-medium">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/setting")}
          className=" flex items-center h-fit px-4 py-2 gap-1 font-medium rounded-lg text-richblack-800 bg-yellow-50"
        >
          Edit
          <i class="ri-edit-box-line"></i>
        </button>
      </div>

      {/* section2*/}
      <div className=" mx-auto flex bg-richblack-800 mt-5 px-7 py-8 rounded-lg justify-between">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-richblack-5 text-lg font-semibold">About</h1>
          <p className="text-sm text-richblack-300">
            {user.additionalDetails.about
              ? user.additionalDetails.about
              : "Write something about youself"}
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/setting")}
          className=" flex items-center h-fit px-4 py-2 gap-1 font-medium rounded-lg text-richblack-800 bg-yellow-50"
        >
          Edit
          <i class="ri-edit-box-line"></i>
        </button>
      </div>

      <div className="mx-auto flex flex-col bg-richblack-800 mt-5 px-7 py-8 rounded-lg ">
        <div className="flex  justify-between items-center">
          <h1 className="text-richblack-5 font-semibold">Personal Details</h1>
          <button
            onClick={() => navigate("/dashboard/setting")}
            className=" flex items-center h-fit px-4 py-2 gap-1 font-medium rounded-lg text-richblack-800 bg-yellow-50"
          >
            Edit
            <i class="ri-edit-box-line"></i>
          </button>
        </div>

        <div className="flex items-center gap-[150px]">
          <div className="flex flex-col gap-3 mt-10">
            <div>
              <p className="text-richblack-500 text-sm">First Name</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.firstName}
              </p>
            </div>
            <div>
              <p className="text-richblack-500 text-sm">Email</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-richblack-500 text-sm">Gender</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.additionalDetails.gender
                  ? user.additionalDetails.gender
                  : "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-col mt-10">
            <div>
              <p className="text-richblack-500 text-sm">Last Name</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.lastName}
              </p>
            </div>

            <div>
              <p className="text-richblack-500 text-sm">Contact Number</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.additionalDetails.contactNumber
                  ? user.additionalDetails.contactNumber
                  : "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="text-richblack-500 text-sm">Date Of Birth</p>
              <p className="text-richblack-5 text-[16px] font-semibold">
                {user.additionalDetails.dateOfBirth
                  ? user.additionalDetails.dateOfBirth
                  : "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
