const { createPlaylist } = require('../controllers/playlistController');
const Playlist = require('../models/Playlist');
const httpMocks = require('node-mocks-http');

jest.mock('../models/Playlist');

describe('Playlist Controller - createPlaylist', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should create a playlist successfully', async () => {
        req.body = { userId: 'userId1', playlistName: 'Test Playlist' };

        Playlist.prototype.save = jest.fn().mockResolvedValue({
            _id: 'playlistId1',
            userId: 'userId1',
            name: 'Test Playlist',
            tracks: [],
        });

        await createPlaylist(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toMatchObject({
            _id: 'playlistId1',
            userId: 'userId1',
            name: 'Test Playlist',
            tracks: [],
        });
    });

    it('should return 400 if userId or playlistName is missing', async () => {
        req.body = { userId: 'userId1' };

        await createPlaylist(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject({ message: 'User ID and playlist name are required' });
    });

    it('should return 500 if there is an error saving the playlist', async () => {
        req.body = { userId: 'userId1', playlistName: 'Test Playlist' };

        Playlist.prototype.save = jest.fn().mockRejectedValue(new Error('Database Error'));

        await createPlaylist(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toMatchObject({ message: 'Error creating playlist' });
    });
});
