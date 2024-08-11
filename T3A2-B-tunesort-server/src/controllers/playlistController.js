// controllers/playlistController.js
const Playlist = require('../models/Playlist');
const axios = require('axios');

const createPlaylist = async (req, res) => {
    const { userId, playlistName } = req.body; 


    if (!userId || !playlistName) {
        return res.status(400).json({ message: 'User ID and playlist name are required' });
    }

    try {
        const newPlaylist = new Playlist({ userId, name: playlistName, tracks: [] }); 
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        console.error('Error creating playlist:', error); 
        res.status(500).json({ message: 'Error creating playlist' });
    }
};

const getUserPlaylists = async (req, res) => {
    const { userId } = req.params;
    try {
        const playlists = await Playlist.find({ userId });
        res.json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addTrack = async (req, res) => {
    const { playlistId, artistName, trackName, spotifyId } = req.body;

    if (!playlistId || !trackName || !artistName || !spotifyId) {
        return res.status(400).json({ message: 'Playlist ID, track name, artist name, and Spotify ID are required' });
    }

    try {
        const spotifyToken = req.headers['spotify-authorization'].split(' ')[1];

        let spotifyResponse;
        try {
            spotifyResponse = await axios.get(`https://api.spotify.com/v1/audio-features/${spotifyId}`, {
                headers: { 'Authorization': `Bearer ${spotifyToken}` }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return res.status(401).json({ message: 'Invalid Spotify access token' });
            } else {
                throw error;
            }
        }

        let {
            acousticness,
            danceability,
            energy,
            key,
            tempo
        } = spotifyResponse.data;

        // Convert acousticness, danceability, energy to whole numbers (1-100)
        acousticness = Math.round(acousticness * 100);
        danceability = Math.round(danceability * 100);
        energy = Math.round(energy * 100);

        const keyMap = [
            { note: "C", camelot: "8B" },   // C Major
            { note: "C♯/D♭", camelot: "3B" }, // C# Major / Db Major
            { note: "D", camelot: "10B" },   // D Major
            { note: "D♯/E♭", camelot: "5B" }, // Eb Major
            { note: "E", camelot: "12B" },   // E Major
            { note: "F", camelot: "7B" },   // F Major
            { note: "F♯/G♭", camelot: "2B" }, // F# Major / Gb Major
            { note: "G", camelot: "9B" },   // G Major
            { note: "G♯/A♭", camelot: "4B" }, // G# Major / Ab Major
            { note: "A", camelot: "11B" },   // A Major
            { note: "A♯/B♭", camelot: "6B" }, // Bb Major
            { note: "B", camelot: "1B" }    // B Major
        ];

        // Convert key to its corresponding musical note and Camelot value (using major keys for now)
        const keyData = key >= 0 && key <= 11 ? keyMap[key] : { note: "Unknown", camelot: "Unknown" };
        const camelot = keyData.camelot; // Use the Camelot B values for major keys

        console.log("Key Data:", keyData);
        console.log("Camelot Value:", camelot);

        // Round tempo to the nearest whole number
        tempo = Math.round(tempo);

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        const trackExists = playlist.tracks.some(t => t.name === trackName && t.artist === artistName);

        if (!trackExists) {
            playlist.tracks.push({
                name: trackName,
                artist: artistName,
                acousticness,
                danceability,
                energy,
                key: keyData.note, // Store the musical note
                camelot, // Store Camelot value as a string
                tempo,
                spotifyId
            });
            await playlist.save();
            res.status(200).json({ message: 'Track added successfully', playlist });
        } else {
            res.status(400).json({ message: 'Track already exists in the playlist' });
        }
    } catch (error) {
        console.error('Error adding track to playlist:', error);
        res.status(500).json({ message: 'Error adding track to playlist', error: error.message });
    }
};

const deleteTrack = async (req, res) => {
    const { playlistId, trackId } = req.body;

    if (!playlistId || !trackId) {
        return res.status(400).json({ message: 'Playlist ID and Track ID are required' });
    }

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        const trackIndex = playlist.tracks.findIndex(track => track.spotifyId === trackId);

        if (trackIndex === -1) {
            return res.status(404).json({ message: 'Track not found in playlist' });
        }

        playlist.tracks.splice(trackIndex, 1);
        await playlist.save();

        res.status(200).json({ message: 'Track deleted successfully', playlist });
    } catch (error) {
        console.error('Error deleting track from playlist:', error);
        res.status(500).json({ message: 'Error deleting track from playlist', error: error.message });
    }
};
const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await Playlist.findByIdAndDelete(id);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createPlaylist, getUserPlaylists, getPlaylistById, addTrack, deleteTrack, deletePlaylist };