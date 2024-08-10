const Playlist = require('../models/Playlist');

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
    const { playlistId, artistName, trackName } = req.body;

    if (!playlistId || !trackName || !artistName) {
        return res.status(400).json({ message: 'Playlist ID, track name, and artist name are required' });
    }

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check if the track is already in the playlist
        const trackExists = playlist.tracks.some(t => t.name === trackName && t.artist === artistName);

        if (!trackExists) {
            playlist.tracks.push({ name: trackName, artist: artistName });
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

// const deletePlaylist = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await Playlist.findByIdAndDelete(id);
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting playlist' });
//     }
// };

module.exports = { createPlaylist, getUserPlaylists, getPlaylistById, addTrack};