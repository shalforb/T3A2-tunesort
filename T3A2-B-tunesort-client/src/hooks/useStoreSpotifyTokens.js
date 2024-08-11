//useStoreSpotifyTokens

import { useState } from 'react';
import axios from 'axios';

const useStoreSpotifyTokens = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const storeSpotifyTokens = async (accessToken, refreshToken, userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/spotify/storeTokens`, {
                accessToken,
                refreshToken,
                userId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            setSuccess(true);
            return response.data;
        } catch (error) {
          
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { storeSpotifyTokens, loading, error, success };
};

export default useStoreSpotifyTokens;
