import { useState } from 'react';

const useGetPlaylistById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    const getPlaylistById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5001/playlists/details/${id}`, {
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
        }
    };

    return { getPlaylistById, playlist, loading, error };
};

export default useGetPlaylistById;
