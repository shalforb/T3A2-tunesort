// __tests__/useAddTrack.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useAddTrack from '../hooks/useAddTrack';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Track added successfully' }),
    })
);

describe('useAddTrack', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add track successfully', async () => {
        const { result } = renderHook(() => useAddTrack());

        await act(async () => {
            const response = await result.current.addTrack('playlistId1', 'Artist Name', 'Track Name', 'spotifyId1');
            expect(response).toMatchObject({ message: 'Track added successfully' });
        });

        expect(result.current.success).toBe(true);
        expect(result.current.error).toBe(null);
    });

    it('should handle errors', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Failed to add track'))
        );

        const { result } = renderHook(() => useAddTrack());

        await act(async () => {
            await result.current.addTrack('playlistId1', 'Artist Name', 'Track Name', 'spotifyId1');
        });

        expect(result.current.error).toBe('Failed to add track');
        expect(result.current.success).toBe(false);
    });
});
