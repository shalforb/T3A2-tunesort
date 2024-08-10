import { useState } from 'react';
import axios from 'axios';

const useExchangeSpotifyToken = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const exchangeSpotifyToken = async (code) => {
        if (!code) {
            return { success: false, error: 'No code provided' };
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.get('http://localhost:5001/spotify/auth/spotify', {
                params: { code }
            });

            console.log('Token exchange response:', response.data);

            const { access_token, refresh_token, error, error_description } = response.data;

            if (error) {
                console.error('Error in token exchange response:', error, error_description);
                setError(error_description);
                return { success: false, error: error_description };
            }

            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setSuccess(true);

            return { success: true, accessToken: access_token, refreshToken: refresh_token };
        } catch (error) {
            console.error('Error exchanging token:', error);
            setError(error.response?.data?.message || error.message);
            return { success: false, error: error.response?.data?.message || error.message };
        } finally {
            setLoading(false);
        }
    };

    return { exchangeSpotifyToken, loading, error, success, accessToken, refreshToken };
};

export default useExchangeSpotifyToken;
