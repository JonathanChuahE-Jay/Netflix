const Profile = require("../models/Profile");
const User = require("../models/User");

exports.createProfile = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!username?.trim()) {
            return res.status(400).json({ message: "Username is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let profile_picture_path = "";
        if (req.file) {
            profile_picture_path = `/uploads/profile_pictures/${req.file.filename}`;
        }

        const profile = new Profile({
            username: username.trim(),
            profile_picture: profile_picture_path,
            userId,
        });

        await profile.save();
        user.profiles.push(profile._id);
        await user.save();

        res.status(201).json({ message: "Profile created successfully", profileId: profile._id });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { username } = req.body;

        const existingProfile = await Profile.findById(req.params.id);
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        let profile_picture_path = existingProfile.profile_picture;

        if (req.file && req.file.filename) {
            profile_picture_path = `/uploads/profile_pictures/${req.file.filename}`;
        }
        existingProfile.username = username || existingProfile.username;
        existingProfile.profile_picture = profile_picture_path;

        await existingProfile.save();

        res.status(200).json({ message: "Profile updated successfully", profile: existingProfile });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        await User.findByIdAndUpdate(profile.userId, { $pull: { profiles: profile._id } });

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
