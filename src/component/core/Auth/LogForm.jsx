import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/AuthOperation";

const LogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, password } = formData;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="w-full flex flex-col mt-6">
      <label className="w-full">
        <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter Email Address"
          className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
      </label>
      <label className="w-full mt-4 relative">
        <p className="text-[15px] leading-[1.375rem] text-richblack-5 ">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleOnChange}
          value={password}
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
        <Link to={"/forgot-password"}>
          <p className="text-blue-100 text-[13px] cursor-pointer ml-auto max-w-max mt-1">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-7 font-medium bg-yellow-50 text-richblack-900 p-2 rounded-lg "
      >
        {" "}
        Sign In
      </button>
    </form>
  );
};

export default LogForm;
