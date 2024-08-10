const express = require('express');
const https = require('https');
const querystring = require('querystring');
const router = express.Router();
const { authorizeSpotify, exchangeCodeForToken } = require('../controllers/spotifyController');


router.get('/authorize', authorizeSpotify);
router.get('/auth/spotify', exchangeCodeForToken);

module.exports = router;











































// // Helper function to request a new access token using the refresh token
// const refreshAccessToken = (callback) => {
//     const postData = querystring.stringify({
//         grant_type: 'refresh_token',
//         refresh_token: refreshToken,
//     });

//     const options = {
//         hostname: 'accounts.spotify.com',
//         port: 443,
//         path: '/api/token',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
//         }
//     };

//     const request = https.request(options, (response) => {
//         let data = '';
//         response.on('data', (chunk) => {
//             data += chunk;
//         });
//         response.on('end', () => {
//             const parsedData = JSON.parse(data);
//             accessToken = parsedData.access_token;
//             tokenExpiryTime = Date.now() + parsedData.expires_in * 1000;
//             if (parsedData.refresh_token) {
//                 refreshToken = parsedData.refresh_token; // Update refresh token if provided
//             }
//             callback(null, accessToken);
//         });
//     });

//     request.on('error', (error) => {
//         callback(error);
//     });

//     request.write(postData);
//     request.end();
// };

// // Route to handle access token request
// router.get('/token', (req, res) => {
//     if (accessToken && Date.now() < tokenExpiryTime) {
//         // Token is still valid
//         res.json({ access_token: accessToken });
//     } else if (refreshToken) {
//         // Refresh the token
//         refreshAccessToken((error, newAccessToken) => {
//             if (error) {
//                 res.status(400).json({ error: error.message });
//             } else {
//                 res.json({ access_token: newAccessToken });
//             }
//         });
//     } else {
//         // No valid token or refresh token
//         res.status(401).json({ error: 'No valid access or refresh token available' });
//     }
// });

// router.post('/storeTokens', (req, res) => {
//     if (accessToken && Date.now() < tokenExpiryTime) {
//         // Token is still valid
//         res.json({ access_token: accessToken });
//     } else if (refreshToken) {
//         // Refresh the token
//         refreshAccessToken((error, newAccessToken) => {
//             if (error) {
//                 res.status(400).json({ error: error.message });
//             } else {
//                 res.json({ access_token: newAccessToken });
//             }
//         });
//     } else {
//         // No valid token or refresh token
//         res.status(401).json({ error: 'No valid access or refresh token available' });
//     }
// });

// Exchange authorization code for access token
// router.get('/auth/spotify', (req, res) => {
//     const { code } = req.query; // The authorization code from Spotify
//     const postData = querystring.stringify({
//         grant_type: 'authorization_code',
//         code,
//         redirect_uri: process.env.SPOTIFY_REDIRECT_URI
//     });

//     const options = {
//         hostname: 'accounts.spotify.com',
//         port: 443,
//         path: '/api/token',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
//             'Content-Length': postData.length
//         }
//     };

//     const request = https.request(options, (response) => {
//         let data = '';
//         response.on('data', (chunk) => {
//             data += chunk;
//             console.log('Spotify Token Exchange Response:', parsedData);
//     });



//     request.on('error', (error) => {
//         res.status(400).json({ error: error.message });
//     });

//     request.write(postData);
//     request.end();
// });

