// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");
// const emailTemplate =
//   require("../mails/templates/emailVerificationTemplate").default;

// const otpSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   otp: {
//     type: String,
//     required: true,
//     minlength: 6,
//     maxlength: 6,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 5 * 60,
//   },
// });

// async function sendverificationEmail(email, otp) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Email verification",
//       emailTemplate(otp)
//     );
//     console.log("email sent successfully: ", mailResponse.response);
//   } catch (error) {
//     console.log("Error occurred while sending email: ", error);
//     throw error;
//   }
// }
// otpSchema.pre("save", async (next) => {
//   console.log("new Document is created");

//   if (this.isNew) {
//     await sendverificationEmail(this.email, this.otp);
//   }
//   next();
// });

// module.exports = mongoose.model("OTP", otpSchema);

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mails/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // 5 minutes expiration
  },
});

// Function to send verification email
async function sendverificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Email verification",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.messageId);
  } catch (error) {
    console.error("Error occurred while sending email: ", error.message);
    throw error;
  }
}

// Pre-save hook to send email
otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log("New OTP document is being created...");
    try {
      await sendverificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Error while sending verification email in pre-save hook");
      next(error); // Pass the error to the next middleware
    }
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
