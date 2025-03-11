import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { updatePassword } from "../services/operations/AuthOperation";
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { password, confirmPassword } = formData;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(updatePassword(password, confirmPassword, token));

    setFormData({
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-[180px]">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="flex flex-col gap-y-2 w-[450px] h-[400px]">
            <h1 className="text-richblack-5 text-3xl mb-2 font-semibold">
              Choose New Password
            </h1>
            <p className="text-richblack-200 text-lg">
              Almost done. Enter your new password and you are all set.
            </p>
            <form onSubmit={handleOnSubmit}>
              <label className="relative">
                <p className="text-richblack-5 text-[14px] mb-1 ">
                  New Password <sup className="text-pink-100">*</sup>
                </p>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter New Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[34px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
                  ) : (
                    <i class="ri-eye-line text-[24px] text-richblack-200"></i>
                  )}
                </span>
              </label>
              <label className="relative">
                <p className="text-richblack-5 text-[14px] mb-1 mt-2 ">
                  Confirm Password <sup className="text-pink-100">*</sup>
                </p>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm New Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[69px] z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <i class="ri-eye-off-line text-[24px] text-richblack-200"></i>
                  ) : (
                    <i class="ri-eye-line text-[24px] text-richblack-200"></i>
                  )}
                </span>
              </label>
              <button
                type="submit"
                className="mt-7 w-full font-medium bg-yellow-50 text-richblack-900 p-2 rounded-lg font-medium "
              >
                Reset Password
              </button>
            </form>

            <div className="flex items-center gap-1 text-richblack-5">
              <Link to={"/login"}>
                <i class="ri-arrow-left-line"></i> Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
