const { addTrack } = require('../controllers/playlistController');
const Playlist = require('../models/Playlist');
const axios = require('axios');
const httpMocks = require('node-mocks-http');

jest.mock('../models/Playlist');
jest.mock('axios');

describe('Playlist Controller - addTrack', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('should add a track to the playlist successfully', async () => {
        req.body = {
            playlistId: 'playlistId1',
            artistName: 'Artist Name',
            trackName: 'Track Name',
            spotifyId: 'spotifyId1'
        };
        req.headers['spotify-authorization'] = 'Bearer spotifyToken';

        const playlist = {
            _id: 'playlistId1',
            name: 'Test Playlist',
            tracks: [],
            save: jest.fn()
        };

        Playlist.findById = jest.fn().mockResolvedValue(playlist);

        axios.get.mockResolvedValue({
            data: {
                acousticness: 0.5,
                danceability: 0.7,
                energy: 0.8,
                key: 1,
                tempo: 120
            }
        });

        await addTrack(req, res);

        expect(res.statusCode).toBe(200);
        expect(playlist.tracks).toHaveLength(1);
        expect(playlist.save).toHaveBeenCalled();
    });

    it('should return 404 if the playlist is not found', async () => {
        req.body = {
            playlistId: 'playlistId1',
            artistName: 'Artist Name',
            trackName: 'Track Name',
            spotifyId: 'spotifyId1'
        };
        Playlist.findById = jest.fn().mockResolvedValue(null);

        await addTrack(req, res);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toMatchObject({ message: 'Playlist not found' });
    });

    it('should return 400 if the track already exists', async () => {
        req.body = {
            playlistId: 'playlistId1',
            artistName: 'Artist Name',
            trackName: 'Track Name',
            spotifyId: 'spotifyId1'
        };

        const playlist = {
            _id: 'playlistId1',
            name: 'Test Playlist',
            tracks: [{ name: 'Track Name', artist: 'Artist Name' }],
            save: jest.fn()
        };

        Playlist.findById = jest.fn().mockResolvedValue(playlist);

        await addTrack(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject({ message: 'Track already exists in the playlist' });
    });
});
