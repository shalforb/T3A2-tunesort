//useGetPlaylistById.js

import { useState } from 'react';

const useGetPlaylistById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playlist, setPlaylist] = useState(null); // Expose setPlaylist

    const getPlaylistById = async (id) => {
        setLoading(true);
        setError(null);

        console.time('getPlaylistById'); // Start timing the API call

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/playlists/details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPlaylist(data);
            } else {
                setError('Failed to fetch playlist details');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            console.timeEnd('getPlaylistById'); // End timing the API call
        }
    };

    return { getPlaylistById, playlist, loading, error, setPlaylist }; // Return setPlaylist
};

export default useGetPlaylistById;
