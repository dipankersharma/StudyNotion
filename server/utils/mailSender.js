// const nodemailer = require("nodemailer");

// require("dotenv").config(); // Load environment variables from .env file

// const mailSender = async (email, title, body) => {
//   try {
//     // create transporter instance
//     const transporter = nodemailer.createTransport({
//       host: "smpt.gmail.com",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASSWORD,
//       },
//     });

//     //  send email

//     let emailInfo = transporter.sendMail({
//       from: "StudyNotion || Dipanker Sharma",
//       to: `${email}`,
//       subject: `${title}`,
//       html: `${body}`,
//     });

//     console.log(emailInfo);
//     return emailInfo;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error sending email");
//   }
// };

// module.exports = mailSender;


const nodemailer = require("nodemailer");

require("dotenv").config(); // Load environment variables from .env file

const mailSender = async (email, title, body) => {
  try {
    // Create transporter instance
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Corrected hostname
      port: 465, // Use 465 for secure connection or 587 for STARTTLS
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER, // Your Gmail email
        pass: process.env.MAIL_PASSWORD, // App Password or email password
      },
    });

    // Send email
    let emailInfo = await transporter.sendMail({
      from: `"StudyNotion || Dipanker Sharma" <${process.env.MAIL_USER}>`, // Sender's email
      to: email, // Receiver's email
      subject: title, // Subject line
      html: body, // Email body
    });

    console.log("Email sent successfully: ", emailInfo.messageId);
    return emailInfo;
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new Error("Error sending email");
  }
};

module.exports = mailSender;
