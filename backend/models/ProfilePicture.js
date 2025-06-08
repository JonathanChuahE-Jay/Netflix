const mongoose = require("mongoose");

const ProfilePictureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProfilePicture", ProfilePictureSchema);
