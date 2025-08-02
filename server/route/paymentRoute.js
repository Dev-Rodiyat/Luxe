const express = require("express");
const { initiatePayment, verifyPayment } = require("../controller/paymentController");
const { protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/initiate", protectUser, initiatePayment);
router.get("/verify/:reference", verifyPayment);

module.exports = router;
