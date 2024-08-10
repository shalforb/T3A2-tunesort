const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const welcomeRoute = require('./routes/welcomeRoute'); 
const userRoutes = require('./routes/userRoutes'); 
const spotifyRoutes = require('./routes/spotifyRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use('/', welcomeRoute);
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/spotify', spotifyRoutes); 

const CONNECTION_URL = 'mongodb://localhost:27017/tunesort';
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
