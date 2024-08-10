// models/Playlist.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    tracks: [{
        name: { type: String },
        artist: { type: String },
    }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;