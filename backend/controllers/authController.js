require("dotenv").config();

const User = require("../models/User");
const Profile = require("../models/Profile");
const Subscription = require("../models/Subscription");
const ProfilePicture = require("../models/ProfilePicture");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
let otpStorage = {};
const OTP_EXPIRY = 5 * 60 * 1000;

exports.register = async (req, res) => {
    try {
        const { username, email, password, subscriptionPlan, phoneNumber } = req.body;

        const normalizedEmail = email.toLowerCase().trim();
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        if (!subscriptionPlan || !subscriptionPlan.id) {
            return res.status(400).json({ message: "Invalid subscription plan data" });
        }

        const subscription = await Subscription.findOne({ id: subscriptionPlan.id });

        if (!subscription) {
            return res.status(404).json({ message: "Subscription plan not found" });
        }

        const profilePictures = await ProfilePicture.find();
        const randomProfilePicture = profilePictures.length > 0
            ? profilePictures[Math.floor(Math.random() * profilePictures.length)].url
            : "/uploads/profile_pictures/default.png";

        const newUser = new User({
            username,
            email: normalizedEmail,
            password: hashedPassword,
            subscriptionPlan: subscription._id,
            phoneNumber: phoneNumber || null,
            profiles: [],
        });

        await newUser.save();

        const defaultProfile = new Profile({
            userId: newUser._id,
            username: username || "Profile 1",
            profile_picture: randomProfilePicture,
            language: "English",
            maturitySetting: "All",
        });

        await defaultProfile.save();

        newUser.profiles = [defaultProfile._id];
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
            .populate("subscriptionPlan")
            .populate("profiles");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                subscriptionPlan: user.subscriptionPlan,
                profiles: user.profiles
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.checkEmailExists = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ message: "Email already registered" });
        }
        res.status(400).json({ message: "Email not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.sendOTP = async (req, res) => {
    const { email, otpType } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }

    if (!otpType || !["register", "reset"].includes(otpType)) {
        return res.status(400).json({ message: "Invalid OTP type" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStorage[email] = { otp, otpType, createdAt: Date.now() };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const subject =
        otpType === "register"
            ? "Your Registration OTP"
            : "Your Password Reset OTP";

    const message =
        otpType === "register"
            ? `Welcome! Your OTP for registration is: ${otp}`
            : `You requested a password reset. Your OTP is: ${otp}`;

    const mailOptions = {
        from: "Netflix@gmail.com",
        to: email,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
}

exports.verifyOTP = async (req, res) => {
    const { email, otp, otpType } = req.body;

    if (!otpStorage[email]) {
        return res.status(400).json({ message: "OTP expired or invalid" });
    }

    const { otp: storedOtp, otpType: storedOtpType, createdAt } = otpStorage[email];

    if (Date.now() - createdAt > OTP_EXPIRY) {
        return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    if (parseInt(storedOtp) !== parseInt(otp) || storedOtpType !== otpType) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otpStorage[email];
    res.status(200).json({ message: "OTP verified successfully" });
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Password is not the same" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully. You can now log in." });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
