const Course = require("../model/courses");
const User = require("../model/user");
const { instance } = require("../config/Razorpay");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

// capture the payement and initiate the razorpay order

exports.capturePayment = async (req, res) => {
  try {
    // fetch data from request body
    const { course_id } = req.body;
    const userId = req.user.id;

    // validate
    if (!course_id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // validate course details from this course_id
    const courseDetails = await Course.findById(course_id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course details not found",
      });
    }

    //   check user already pay for this course
    const uid = new mongoose.Schema.Types.ObjectId(userId);
    // this is used to convert string id into object id

    if (courseDetails.studentsEnroll.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled in this course",
      });
    }

    // order create

    const amount = courseDetails.price * 100;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("paymentResponse: ", paymentResponse);

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      coursename: courseDetails.courseName,
      courseDescription: courseDetails.courseDescription,
      thumbnail: courseDetails.thumbnail,
      orderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while capturing payment",
    });
  }
};

// verify signature

exports.verifySignature = async (req, res) => {
  try {
    // define secretecode and fetching secretcode from razorpay
    const webHookSecret = "12345678";
    const signatureSecret = req.headers["x-razorpay-signature"];

    //  hashing secretcode using three step process
    const shaSum = crypto.createHmac("sha256", webHookSecret);
    shaSum.update(JSON.stringify(req.body));
    const computedSignature = shaSum.digest("hex");

    if (computedSignature === signatureSecret) {
      console.log("Payment is authorized");

      // performing action

      // find the course and enroll student in it
      const { courseId, userId } = req.body.payload.payment.entity.notes;

      try {
        const courseEnroll = await Course.findByIdAndUpdate(
          { _id: courseId },
          { $push: { studentsEnroll: userId } },
          { new: true }
        );

        if (!courseEnroll) {
          return res.status(404).json({
            success: false,
            message: "Course not found",
          });
        }
        console.log(courseEnroll);

        //    find the student and enroll course in it

        const studentEnroll = await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );

        console.log(studentEnroll);

        // send confirmation email to student

        const emailResponse = mailSender(
          studentEnroll.email,
          "Course Enroll Successfully",
          `Dear ${studentEnroll.firstName}, you have successfully enrolled in ${courseEnroll.courseName}. So start your journey with us and for more querry contact our PR team`
        );
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while enrolling student in course",
        });
      }
    } else {
      console.log("Payment is not authorized");
      return res.status(401).json({
        success: false,
        message: "Payment signature verification failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error while verifying signature",
    });
  }
};
