const express = require('express');
const { createPlaylist, getUserPlaylists, getPlaylistById, addTrack, deleteTrack, deletePlaylist} = require('../controllers/playlistController');
const authMiddleware = require('../../middleware/auth'); 
const router = express.Router();



router.use(authMiddleware);

router.post('/create', createPlaylist);
router.get('/:userId', getUserPlaylists);
router.get('/details/:id', getPlaylistById)
router.post('/addTrack', addTrack);
router.delete('/deleteTrack', deleteTrack);
router.delete('/:id', deletePlaylist);


module.exports = router;