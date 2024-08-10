const express = require('express');
const { createPlaylist, getUserPlaylists, getPlaylistById, addTrack} = require('../controllers/playlistController');
const authMiddleware = require('../../middleware/auth'); 
const router = express.Router();



router.use(authMiddleware);

router.post('/create', createPlaylist);
router.get('/:userId', getUserPlaylists);
router.get('/details/:id', getPlaylistById)
router.post('/addTrack', addTrack);


module.exports = router;