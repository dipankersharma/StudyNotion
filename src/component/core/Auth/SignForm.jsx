import React from "react";
import { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constanst";
import Tab from "../../../common/Tab";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Sendotp } from "../../../services/operations/AuthOperation";
const SignForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setconfirmPassword] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  console.log(firstName, lastName, email, password);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  console.log(accountType);
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  const changeHandler = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };
    console.log(signupData);
    dispatch(setSignupData(signupData));
    dispatch(Sendotp(formData.email, navigate));

    // reset form data
    setformData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <div>
      <Tab data={tabData} field={accountType} setfield={setAccountType} />
      {/* tab sextion */}

      <form onSubmit={submitHandler}>
        <div className="flex gap-x-4 mt-5">
          <label className="w-full">
            <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
              placeholder="Enter first name"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
          <label className="w-full mb-3">
            <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
              placeholder="Enter last name"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </label>
        </div>
        <label className="w-full">
          <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Enter Email Address"
            className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </label>
        <div className="flex gap-x-4">
          <label className="w-full mt-4 relative">
            <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={changeHandler}
              placeholder="Enter Password"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1 "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[32px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
              ) : (
                <i class="ri-eye-line text-[24px] text-richblack-200"></i>
              )}
            </span>
          </label>
          <label className="w-full mt-4 relative">
            <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showconfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1 "
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
            <span
              onClick={() => setconfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[32px] z-[10] cursor-pointer"
            >
              {showconfirmPassword ? (
                <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
              ) : (
                <i class="ri-eye-line text-[24px] text-richblack-200"></i>
              )}
            </span>
          </label>
        </div>
        <button className="mt-7 w-full font-medium bg-yellow-50 text-richblack-900 p-2 rounded-lg ">
          {" "}
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignForm;
