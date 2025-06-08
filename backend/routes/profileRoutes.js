const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const profileController = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads/profile_pictures");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
        }
    },
});

router.post("/", verifyToken, upload.single("profile_picture"), profileController.createProfile);
router.get("/", verifyToken, profileController.getProfiles);
router.get("/:id", verifyToken, profileController.getProfileById);
router.put("/:id", verifyToken, upload.single("profile_picture"), profileController.updateProfile);
router.delete("/:id", verifyToken, profileController.deleteProfile);

module.exports = router;
