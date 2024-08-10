import { useState } from 'react';


const useCreatePlaylist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const createPlaylist = async (userId, playlistName) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:5001/playlists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token here
                },
                body: JSON.stringify({ userId, playlistName }),
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

    return { createPlaylist, loading, error, success };
};

export default useCreatePlaylist;
