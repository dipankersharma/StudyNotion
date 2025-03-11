const User = require("../model/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

// reset password token
exports.resetpasswordToken = async (req, res) => {
  try {
    // fetch data
    const { email } = req.body;
    // validate data
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // generate token
    const token = crypto.randomUUID();

    // save token and expiring date in user collection
    const updatedDetails = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        token: token,
        resetpasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create url

    const url = `http://localhost:5173/update-password/${token}`;
    // send email with url for changing password
    await mailSender(
      email,
      "Reset Password Link",
      `Reset Password Link: ${url}`
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Reset password link sent successfully",
      data: url,
      token,
      updatedDetails,
    });
  } catch (error) {
    console.error("Error in reset password token", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while reset password link sent",
      error: error.message,
    });
  }
};

// Reset Password

exports.resetPassword = async (req, res) => {
  try {
    //  fetch data
    const { password, confirmPassword, token } = req.body;
    // validate data
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password and Token are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    // get userdetails using token
    const user = await User.findOne({ token: token });
    // if no user means invalid token
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Token",
      });
    }
    // check token time
    const currentTime = Date.now();
    if (currentTime > user.resetpasswordExpires) {
      return res.status(400).json({
        success: false,
        message: "Token expired, please generate a new one",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // update password in user collection
    const newDetails = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: newDetails,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Server Error while resetting password",
      error: error.message,
    });
  }
};
