import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileDetail } from "../../../../services/operations/SettingApis";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  console.log(token);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        dateOfBirth: "",
        contactNumber: "",
        gender: "",
        about: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const handleForm = (data) => {
    console.log(data);
    try {
      dispatch(updateProfileDetail(token, data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(handleForm)}>
      <div className="  flex flex-col bg-richblack-800 mt-10 px-7 py-8 rounded-lg justify-between">
        <h1 className="text-richblack-5 text-lg font-semibold">
          Profile Information
        </h1>

        <div className="flex gap-5 flex-col items-center mt-5">
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1 "
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="dd/mm/yyyy"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="lastname">
                Gender
              </label>

              <select
                name="gender"
                id="gender"
                placeholder="Enter Gender"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-5 items-center w-full">
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                placeholder="Enter Contact Number"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                defaultValue={user?.additionalDetails?.contactNumber}
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label className="text-richblack-5" htmlFor="about">
                About
              </label>
              <input
                type="text"
                name="about"
                placeholder="Write about yourself"
                className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          className="text-richblack-5 bg-richblack-700 px-4 py-1 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-yellow-50 text-richblack-800 px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
