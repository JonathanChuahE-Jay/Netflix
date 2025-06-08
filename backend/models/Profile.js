const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    profile_picture: { type: String },
    language: { type: String, default: "English" },
    maturitySetting: { type: String, default: "All" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Profile", ProfileSchema);
