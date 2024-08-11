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

const corsOptions = {
    origin: process.env.VITE_SERVER_BASE_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If your frontend needs to send cookies with requests
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions)); // Apply CORS middleware with options

app.use(express.json());
// app.use(cors('*', corsOptions));
app.use('/', welcomeRoute);
app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);
app.use('/spotify', spotifyRoutes); 

// app.use(express.static(path.join(__dirname, '..', 'T3A2-B-tunesort-client', 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'T3A2-B-tunesort-client', 'dist', 'index.html'));
// });

const CONNECTION_URL = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
