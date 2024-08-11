// models/Playlist.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: String,
    artist: String,
    acousticness: Number,
    danceability: Number,
    energy: Number,
    key: String, // Changed from Number to String
    camelot: String, // Store the Camelot value as a String
    tempo: Number,
    spotifyId: String
});

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    tracks: [trackSchema]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
