const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication
// exports.authentication = (req, res, next) => {
//   try {
//     // fetch token

//     const token =
//       req.cookies.token ||
//       req.body.token ||
//       req.header("Authorization").replace("Bearer ", "");

//     console.log(token);

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is not provided",
//       });
//     }

//     // verify token
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log(decoded);
//       req.user = decoded;
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         message: error.message,
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
exports.authentication = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not provided",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded User:", decoded);

      if (!decoded?.id) {
        return res.status(401).json({
          success: false,
          message: "Invalid Token: ID missing",
        });
      }

      req.user = decoded; // ✅ Only assign if valid
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "student") {
      return res.status(403).json({
        success: false,
        message: "You are not a student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in checking student role",
    });
  }
};

// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "You are not an instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in checking instructor role",
    });
  }
};

// isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not an admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in checking admin role",
    });
  }
};
