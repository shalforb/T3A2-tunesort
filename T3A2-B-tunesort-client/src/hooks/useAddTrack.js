//useAddTrack.js

import { useState } from 'react';

const useAddTrack = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addTrack = async (playlistId, artistName, trackName, spotifyId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

  
        const jwtToken = localStorage.getItem('token');
        const spotifyAccessToken = localStorage.getItem('spotifyAccessToken');

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/playlists/addTrack`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`, // Include the JWT token here
                    'Spotify-Authorization': `Bearer ${spotifyAccessToken}` // Include the Spotify access token here
                },
                body: JSON.stringify({ playlistId, artistName, trackName, spotifyId }),
            });

            if (res.ok) {
                const data = await res.json();
                setSuccess(true);
                return data;
            } else {
                const errorData = await res.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { addTrack, loading, error, success };
};

export default useAddTrack;


