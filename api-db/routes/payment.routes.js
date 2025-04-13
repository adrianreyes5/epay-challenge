const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

/**
 * Create payment session
 */
router.post("/create-session", paymentController.createPaymentSession);

/**
 * Confirm payment
 */
router.post("/confirm", paymentController.confirmPayment);

module.exports = router;
