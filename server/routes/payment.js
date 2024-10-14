const express = require("express");
const routes = express.Router();

// import controllers
const {
  capturePayment,
  verifySignature,
} = require("../controller/PaymentIntegration");
const { authentication, isStudent } = require("../middleware/auth");

// payment routes

routes.post("/createpayment", authentication, capturePayment);
routes.post("/verifySignature", verifySignature);

module.exports = routes;
