const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
    getProfilePictures,
    uploadProfilePicture,
    deleteProfilePicture
} = require("../controllers/ProfilePictureController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/profile_pictures";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/", getProfilePictures);

router.post("/upload", upload.single("profile_picture"), uploadProfilePicture);

router.delete("/:id", deleteProfilePicture);

module.exports = router;
