const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: String,
    artist: String,
    acousticness: Number,
    danceability: Number,
    energy: Number,
    key: String, 
    camelot: String, 
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
