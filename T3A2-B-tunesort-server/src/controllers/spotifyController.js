const https = require('https');
const querystring = require('querystring');
const User = require('../models/User');
const axios = require('axios');


const authorizeSpotify = (req, res) => {
    const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
    const scopes = 'playlist-modify-public playlist-modify-private';
    const authUrl = `${SPOTIFY_AUTH_URL}?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
    
    res.redirect(authUrl);
};

const exchangeCodeForToken = (req, res) => {
    const { code } = req.query;
    const postData = querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    });

    const options = {
        hostname: 'accounts.spotify.com',
        port: 443,
        path: '/api/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
            'Content-Length': postData.length
        }
    };

    const request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            } catch (error) {
                res.status(500).json({ error: 'Error parsing response data' });
            }
        });
    });

    request.on('error', (error) => {
        res.status(400).json({ error: error.message });
    });

    request.write(postData);
    request.end();
};

const storeSpotifyTokens = async (req, res) => {
    const { accessToken, refreshToken, userId } = req.body; // Destructure tokens and userId from the request body

    if (!accessToken || !refreshToken || !userId) {
        return res.status(400).json({ message: 'Access token, refresh token, and user ID are required' });
    }

    try {
        // Find the user by ID and update their tokens
        const user = await User.findByIdAndUpdate(
            userId,
            { accessToken, refreshToken },
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Tokens stored successfully', user });
    } catch (error) {
        console.error('Error storing tokens:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const searchSpotify = async (req, res) => {
    const { q } = req.query;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: q,
                type: 'track',
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { authorizeSpotify, exchangeCodeForToken, storeSpotifyTokens, searchSpotify };

