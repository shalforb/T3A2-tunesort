// useDeleteTrack.js
import { useState } from 'react';

const useDeleteTrack = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteTrack = async (playlistId, trackId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/playlists/deleteTrack`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token if applicable
                },
                body: JSON.stringify({ playlistId, trackId }),
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

    return { deleteTrack, loading, error, success };
};

export default useDeleteTrack;
