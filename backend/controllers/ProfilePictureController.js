const ProfilePicture = require("../models/ProfilePicture.js");
const path = require("path");
const fs = require("fs");

exports.getProfilePictures = async (req, res) => {
    try {
        const pictures = await ProfilePicture.find({});
        res.json(pictures);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile pictures", error: err });
    }
};

exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const newPicture = new ProfilePicture({
            name: req.file.filename,
            url: `/uploads/profile_pictures/${req.file.filename}`,
            isDefault: false,
            uploadedBy: req.user ? req.user._id : null,
        });

        await newPicture.save();
        res.status(201).json({ message: "Profile picture uploaded", profilePicture: newPicture });
    } catch (err) {
        res.status(500).json({ message: "Error uploading profile picture", error: err });
    }
};

exports.deleteProfilePicture = async (req, res) => {
    try {
        const picture = await ProfilePicture.findById(req.params.id);
        if (!picture) return res.status(404).json({ message: "Profile picture not found" });

        const filePath = path.join("uploads", "profile_pictures", path.basename(picture.url));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await ProfilePicture.findByIdAndDelete(req.params.id);
        res.json({ message: "Profile picture deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting profile picture", error: err });
    }
};
