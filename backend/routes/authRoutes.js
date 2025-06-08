const express = require("express");
const { register, login, checkEmailExists, sendOTP, verifyOTP, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/check-email", checkEmailExists);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post('/reset-password',resetPassword)

module.exports = router;
