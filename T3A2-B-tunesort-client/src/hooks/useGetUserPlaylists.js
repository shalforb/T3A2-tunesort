import { useState } from 'react';


const useGetUserPlaylists = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const getUserPlaylists = async (userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/playlists/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the JWT token here
                },
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

    return { getUserPlaylists, loading, error, success };
};

export default useGetUserPlaylists;
