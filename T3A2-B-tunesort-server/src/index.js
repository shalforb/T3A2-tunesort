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

app.use(express.static(path.join(__dirname, '..', 'T3A2-B-tunesort-client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'T3A2-B-tunesort-client', 'dist', 'index.html'));
});

const CONNECTION_URL = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
