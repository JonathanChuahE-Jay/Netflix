const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads/profile_pictures");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profiles", require("./routes/profileRoutes"));
app.use("/api/profile-pictures", require("./routes/profilePictureRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
