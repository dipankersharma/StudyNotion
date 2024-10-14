const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");
const nodemailer = require("nodemailer");

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
    expires: 5 * 60,
  },
});
otpSchema.pre("save", async (next) => {
  const otpDocument = this;
  try {
    // create Transporter
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // send mail
    let mail = await transporter.sendMail({
      from: "dipankar.kr2005@gmail.com",
      to: otpDocument.email,
      subject:
        "This is your OTP for sign up please fill this otp while signing up",
      html: `<h1>This is your OTP for sign up ${otpDocument.otp}</h1>`,
    });
    console.log("email sent successfully....");
  } catch (error) {
    console.error("Error sending email", error);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
