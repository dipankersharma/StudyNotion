import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sendotp, signup } from "../services/operations/AuthOperation";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const { signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  
  console.log(otp)
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } =
    signupData;
    console.log( accountType, firstName, lastName, email, password, confirmPassword)
    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-[180px]">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className="flex flex-col gap-y-2 w-[450px] h-[400px]">
            <h1 className="text-richblack-5 text-3xl mb-2 font-semibold">
              Verify Email
            </h1>
            <p className="text-richblack-200 text-lg">
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleOnSubmit}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} 
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"/>}
                renderSeparator={<span>-</span>}
              
                inputStyleStyle={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
              <button
                type="submit"
                className="mt-7 w-full font-medium bg-yellow-50 text-richblack-900 p-2 rounded-lg font-medium "
              >
                Verify Email
              </button>
            </form>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-richblack-5">
                <Link to={"/login"}>
                  <i class="ri-arrow-left-line"></i> Back to login
                </Link>
              </div>
              <button
                onClick={() => dispatch(Sendotp(signupData.email))}
                className="flex items-center gap-1 text-richblack-5"
              >
                <i class="ri-loop-left-line"></i> Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
