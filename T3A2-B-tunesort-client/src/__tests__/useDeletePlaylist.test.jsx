// __tests__/useDeleteTrack.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useDeleteTrack from '../hooks/useDeleteTrack';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Track deleted successfully' }),
    })
);

describe('useDeleteTrack Hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete track successfully', async () => {
        const { result } = renderHook(() => useDeleteTrack());

        await act(async () => {
            const response = await result.current.deleteTrack('playlistId1', 'trackId1');
            expect(response).toMatchObject({ message: 'Track deleted successfully' });
        });

        expect(result.current.success).toBe(true);
        expect(result.current.error).toBe(null);
    });

    it('should handle errors during track deletion', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Failed to delete track'))
        );

        const { result } = renderHook(() => useDeleteTrack());

        await act(async () => {
            await result.current.deleteTrack('playlistId1', 'trackId1');
        });

        expect(result.current.error).toBe('Failed to delete track');
        expect(result.current.success).toBe(false);
    });
});
