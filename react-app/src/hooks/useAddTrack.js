import { useState } from 'react';


const useAddTrack = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const addTrack = async (playlistId, artistName, trackName) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:5001/playlists/addTrack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token here
                },
                body: JSON.stringify({ playlistId, artistName, trackName }),
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
