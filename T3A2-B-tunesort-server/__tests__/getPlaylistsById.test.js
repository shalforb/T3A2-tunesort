const { getPlaylistById } = require('../controllers/playlistController');
const Playlist = require('../models/Playlist');
const httpMocks = require('node-mocks-http');

jest.mock('../models/Playlist');

describe('Playlist Controller - getPlaylistById', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should fetch a playlist by ID successfully', async () => {
        req.params.id = 'playlistId1';

        Playlist.findById = jest.fn().mockResolvedValue({
            _id: 'playlistId1',
            userId: 'userId1',
            name: 'Test Playlist',
            tracks: []
        });

        await getPlaylistById(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toMatchObject({
            _id: 'playlistId1',
            userId: 'userId1',
            name: 'Test Playlist',
            tracks: []
        });
    });

    it('should return 404 if the playlist is not found', async () => {
        req.params.id = 'playlistId1';
        Playlist.findById = jest.fn().mockResolvedValue(null);

        await getPlaylistById(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toMatchObject({ message: 'Playlist not found' });
    });

    it('should return 500 if there is an error fetching the playlist', async () => {
        req.params.id = 'playlistId1';
        Playlist.findById = jest.fn().mockRejectedValue(new Error('Database Error'));

        await getPlaylistById(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toMatchObject({ message: 'Database Error' });
    });
});
