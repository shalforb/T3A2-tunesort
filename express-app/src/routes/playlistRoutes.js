const express = require('express');
const { createPlaylist, getUserPlaylists, getPlaylistById } = require('../controllers/playlistController');
const authMiddleware = require('../../middleware/auth'); 
const router = express.Router();



router.use(authMiddleware);

router.post('/create', createPlaylist);
router.get('/:userId', getUserPlaylists);
router.get('/details/:id', getPlaylistById)


module.exports = router;