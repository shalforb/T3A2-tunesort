const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const welcomeRoute = require('./routes/welcomeRoute'); 
const userRoutes = require('./routes/userRoutes'); 
const spotifyRoutes = require('./routes/spotifyRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: 'https://t3-a2-tunesort-client.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Spotify-Authorization'],
  credentials: true, 
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Handle Preflight Requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Define Routes AFTER applying CORS middleware
app.use('/', welcomeRoute);
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/spotify', spotifyRoutes); 

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB and Start Server
const CONNECTION_URL = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error('MongoDB connection error:', error.message));
