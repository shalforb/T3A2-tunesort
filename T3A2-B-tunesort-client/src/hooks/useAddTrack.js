// useAddTrack.js
import { useState } from 'react';

const useAddTrack = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addTrack = async (playlistId, artistName, trackName, spotifyId) => {
        setLoading(true);
        setError(null);
        setSuccess(false); // Reset success before the operation

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/playlists/addTrack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Spotify-Authorization': `Bearer ${localStorage.getItem('spotifyAccessToken')}`
                },
                body: JSON.stringify({ playlistId, artistName, trackName, spotifyId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                return false; // Return false if adding the track failed
            }

            setSuccess(true); // Set success to true if the track was added successfully
            return true; // Return true on success
        } catch (error) {
            setError(error.message);
            return false; // Return false on error
        } finally {
            setLoading(false);
        }
    };

    return { addTrack, loading, error, success };
};

export default useAddTrack;
