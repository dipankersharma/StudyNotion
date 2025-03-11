const User = require("../model/user");
const OTP = require("../model/otp");
const bcrypt = require("bcrypt");
const Profile = require("../model/profile");
exports.signup = async (req, res) => {
  try {
    //  fetch data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;

    // validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !otp ||
      !confirmPassword
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // validate password
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // check weather user already registered or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    // find most recent otp stored for the user
    const recentOtp = await OTP.findOne({ email: email }).sort({
      createdAt: -1,
    });
    if (!recentOtp) {
      throw new Error("No OTP found for the provided email");
    }
    console.log(recentOtp);
    console.log(otp);

    // validate otp

    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    // hashed password
    const hashPassword = await bcrypt.hash(password, 10);
    // create  entry in database

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in signup", error);
    return res.status(500).json({
      success: false,
      message: "user is not registered, please try after some time",
      error: error.message,
    });
  }
};
