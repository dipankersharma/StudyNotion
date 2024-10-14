const User = require("../model/user");
const OTP = require("../model/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../model/profile");
require("dotenv").config();

// send otp

exports.sendOtp = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }
    // generate otp

    var otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    // console.log("Otp: ", otp);
    // check, is otp unique
    var otpExists = await OTP.findOne({ otp });
    while (otpExists) {
      otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
      });
      otpExists = await OTP.findOne({ otp });
    }

    const payload = {
      email,
      otp,
    };
    // save otp in database
    const otpBody = await OTP.create(payload);

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      otp,
    });
  } catch (error) {
    console.error("Error sending otp", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// signup handler

// login controller

exports.login = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;
    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // find user by email
    let user = await User.findOne({ email });
    // check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // generate jwt token

      const payload = {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      // user.token = token;
      user.password = undefined;
      // create cookies

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 2 * 24),
        httpOnly: true,
      });
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error("Error in login", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// reset password

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confimPassword } = req.body;
    // validate data
    if ((!email, !oldPassword, !newPassword, !confimPassword)) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
      // get user

      const user = await User.findOne({ email });
      // check if user exists
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      // check old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect old password",
        });
      }
      // validate new password
      if (newPassword !== confimPassword) {
        return res.status(403).json({
          success: false,
          message: "Passwords do not match",
        });
      }
      // hashed password
      const hashPassword = await bcrypt.hash(newPassword, 10);
      // update password in database
      const updatedDetails = await User.findOneAndUpdate(
        email,
        { password: hashPassword },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "password change successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while changing password",
    });
  }
};
