
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { setResetPasswordToken } from "../services/operations/AuthOperation";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e)=>{
          e.preventDefault()
          dispatch(setResetPasswordToken(email, setEmailSent))
  }
  return (
    <div className="flex items-center justify-center mt-[180px]">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="flex flex-col gap-y-2 w-[450px] h-[400px]">
          <h1 className="text-richblack-5 text-3xl mb-2 font-semibold">{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>
          <p className="text-richblack-200 text-xl">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the resent email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} >
            {!emailSent && (
              <label>
                <p  className="text-richblack-5 text-[14px] mb-1 ">
                  Email Address <sup className="text-pink-100">*</sup>
                </p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="rounded-lg w-full bg-richblack-700 p-[12px] text-richblack-5 p-[12px] mt-1"
                />
              </label>
            )}
            <button type="submit" className="mt-7 w-full font-medium bg-yellow-50 text-richblack-900 p-2 rounded-lg font-medium ">
            
            {!emailSent ? "Reset Password" : "Resend Email"}
        
        </button>
          </form>

          
          <div className="flex items-center gap-1 text-richblack-5">
            <Link to={'/login'}>
            <i class="ri-arrow-left-line"></i> Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
