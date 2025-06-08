const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
