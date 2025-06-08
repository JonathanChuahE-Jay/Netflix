const mongoose = require("mongoose");

const WatchHistorySchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    watchedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("WatchHistory", WatchHistorySchema);
