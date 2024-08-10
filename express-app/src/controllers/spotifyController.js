const https = require('https');
const querystring = require('querystring');


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

module.exports = { authorizeSpotify, exchangeCodeForToken };

