// __tests__/useCreatePlaylist.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useCreatePlaylist from '../hooks/useCreatePlaylist';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            _id: 'playlistId1',
            userId: 'userId1',
            name: 'Test Playlist',
            tracks: []
        }),
    })
);

describe('useCreatePlaylist Hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create playlist successfully', async () => {
        const { result } = renderHook(() => useCreatePlaylist());

        await act(async () => {
            const response = await result.current.createPlaylist('userId1', 'Test Playlist');
            expect(response).toMatchObject({
                _id: 'playlistId1',
                userId: 'userId1',
                name: 'Test Playlist',
                tracks: [],
            });
        });

        expect(result.current.success).toBe(true);
        expect(result.current.error).toBe(null);
    });

    it('should handle errors during playlist creation', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Failed to create playlist'))
        );

        const { result } = renderHook(() => useCreatePlaylist());

        await act(async () => {
            await result.current.createPlaylist('userId1', 'Test Playlist');
        });

        expect(result.current.error).toBe('Failed to create playlist');
        expect(result.current.success).toBe(false);
    });
});
