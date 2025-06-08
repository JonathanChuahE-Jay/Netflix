const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    resolution: { type: String, required: true },
    videoQuality: { type: String, required: true },
    supportedDevices: { type: [String], required: true },
    simultaneousStreams: { type: Number, required: true },
    deviceLimit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
