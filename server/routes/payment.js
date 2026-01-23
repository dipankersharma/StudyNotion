const express = require("express");
const routes = express.Router();

// import controllers
const {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail,
} = require("../controller/PaymentIntegration");
const { authentication, isStudent } = require("../middleware/auth");

// payment routes

routes.post("/createpayment", authentication, isStudent, capturePayment);
routes.post("/verifysignature", authentication, isStudent, verifySignature);
routes.post(
  "/SuccessEmail",
  authentication,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = routes;
