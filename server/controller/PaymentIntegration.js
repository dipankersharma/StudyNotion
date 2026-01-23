const Course = require("../model/courses");
const crypto = require("crypto");
const User = require("../model/user");
const { instance } = require("../config/Razorpay");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mails/templates/CourseEnrolledEmail");
const {
  paymentSuccessEmail,
} = require("../mails/templates/paymentSuccessEmail");

// capture the payement and initiate the razorpay order

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Courses are required",
    });
  }

  let totalAmount = 0;

  try {
    let course;

    for (const course_id of courses) {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found`,
        });
      }

      const uid = new mongoose.Schema.Types.ObjectId(userId);
      if (course.studentsEnroll.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: `User already enrolled in course`,
        });
      }

      totalAmount += course.price;
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while calculating total amount",
    });
  }

  const options = {
    amount: totalAmount * 100, // converting to paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courses: courses,
      userId: userId,
    },
  };
  try {
    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      paymentResponse,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// verify signature

exports.verifySignature = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", "pUl0BnyHsEjPfT8IMVoFaudM")
    .update(body.toString())
    .digest("hex");

  // match the signatures
  if (expectedSignature === razorpay_signature) {
    // enroll the user in courses
    studentEnrollInCourses(courses, userId, res);

    // return the success response
    return res.status(200).json({
      success: true,
      message: "Payment is verified successfully",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Payment verification failed",
  });
};

const studentEnrollInCourses = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Courses and User ID are required",
    });
  }
  console.log("Enrolling user in courses:", courses, "for user:", userId);

  for (let course_id of courses) {
    try {
      let enrollment = await Course.findByIdAndUpdate(
        {
          _id: course_id,
        },
        {
          $push: { studentsEnroll: userId },
        },
        {
          new: true,
        }
      );
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Course not found for enrollment",
        });
      }

      let studentenrolled = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $push: { courses: course_id },
        },
        {
          new: true,
        }
      );

      if (!studentenrolled) {
        return res.status(404).json({
          success: false,
          message: "User not found for enrollment",
        });
      }
      

      // send confirmation email to student
      const emailResponse = mailSender(
        studentenrolled?.email,
        `You have successfully enrolled in ${enrollment?.courseName}`,
        courseEnrollmentEmail(
          enrollment?.courseName,
          studentenrolled?.firstName
        )
      );

      if (!emailResponse) {
        return res.status(500).json({
          success: false,
          message: "Error while sending confirmation email",
        });
      }
    } catch (error) {
      console.error("Error enrolling student in course:", error);
      return res.status(500).json({
        success: false,
        message: "Error while enrolling student in course",
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { paymentId, orderId, amount } = req.body;
  const userId = req.user.id;

  if (!paymentId || !orderId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }

  try {
    const user = await User.findById(userId);

    await mailSender(
      user?.email,
      "Payment Recieved",
      paymentSuccessEmail(
        `${user?.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.error("Error while sending payment success email:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error while sending payment success email",
    });
  }
};

// exports.capturePayment = async (req, res) => {
//   try {
//     // fetch data from request body
//     const { course_id } = req.body;
//     const userId = req.user.id;

//     // validate
//     if (!course_id || !userId) {
//       return res.status(400).json({
//         success: false,
//         message: "Course ID is required",
//       });
//     }

//     // validate course details from this course_id
//     const courseDetails = await Course.findById(course_id);
//     if (!courseDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Course details not found",
//       });
//     }

//     //   check user already pay for this course
//     const uid = new mongoose.Schema.Types.ObjectId(userId);
//     // this is used to convert string id into object id

//     if (courseDetails.studentsEnroll.includes(uid)) {
//       return res.status(400).json({
//         success: false,
//         message: "User already enrolled in this course",
//       });
//     }

//     // order create

//     const amount = courseDetails.price * 100;
//     const currency = "INR";

//     const options = {
//       amount,
//       currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: course_id,
//         userId,
//       },
//     };

//     const paymentResponse = await instance.orders.create(options);
//     console.log("paymentResponse: ", paymentResponse);

//     return res.status(200).json({
//       success: true,
//       message: "Payment captured successfully",
//       coursename: courseDetails.courseName,
//       courseDescription: courseDetails.courseDescription,
//       thumbnail: courseDetails.thumbnail,
//       orderId: paymentResponse.id,
//       amount: paymentResponse.amount,
//       currency: paymentResponse.currency,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error while capturing payment",
//     });
//   }
// };

// // verify signature

// exports.verifySignature = async (req, res) => {
//   try {
//     // define secretecode and fetching secretcode from razorpay
//     const webHookSecret = "12345678";
//     const signatureSecret = req.headers["x-razorpay-signature"];

//     //  hashing secretcode using three step process
//     const shaSum = crypto.createHmac("sha256", webHookSecret);
//     shaSum.update(JSON.stringify(req.body));
//     const computedSignature = shaSum.digest("hex");

//     if (computedSignature === signatureSecret) {
//       console.log("Payment is authorized");

//       // performing action

//       // find the course and enroll student in it
//       const { courseId, userId } = req.body.payload.payment.entity.notes;

//       try {
//         const courseEnroll = await Course.findByIdAndUpdate(
//           { _id: courseId },
//           { $push: { studentsEnroll: userId } },
//           { new: true }
//         );

//         if (!courseEnroll) {
//           return res.status(404).json({
//             success: false,
//             message: "Course not found",
//           });
//         }
//         console.log(courseEnroll);

//         //    find the student and enroll course in it

//         const studentEnroll = await User.findByIdAndUpdate(
//           { _id: userId },
//           { $push: { courses: courseId } },
//           { new: true }
//         );

//         console.log(studentEnroll);

//         // send confirmation email to student

//         const emailResponse = mailSender(
//           studentEnroll.email,
//           "Course Enroll Successfully",
//           `Dear ${studentEnroll.firstName}, you have successfully enrolled in ${courseEnroll.courseName}. So start your journey with us and for more querry contact our PR team`
//         );
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: "Error while enrolling student in course",
//         });
//       }
//     } else {
//       console.log("Payment is not authorized");
//       return res.status(401).json({
//         success: false,
//         message: "Payment signature verification failed",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error while verifying signature",
//     });
//   }
// };
