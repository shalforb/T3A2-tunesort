import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserHome from '../pages/UserHome';
import { useUser } from '../context/userContext';
import useGetUserPlaylists from '../hooks/useGetUserPlaylists';
import useCreatePlaylist from '../hooks/useCreatePlaylist';

jest.mock('../context/userContext');
jest.mock('../hooks/useGetUserPlaylists');
jest.mock('../hooks/useCreatePlaylist');

describe('UserHome Component', () => {
    beforeEach(() => {
        useUser.mockReturnValue({ user: { _id: 'userId1' } });
        useGetUserPlaylists.mockReturnValue({
            getUserPlaylists: jest.fn().mockResolvedValue([
                { _id: 'playlistId1', name: 'Playlist 1' },
                { _id: 'playlistId2', name: 'Playlist 2' },
            ]),
        });
        useCreatePlaylist.mockReturnValue({
            createPlaylist: jest.fn(),
        });
    });

    it('should render user playlists', async () => {
        render(<UserHome />);

        expect(screen.getByText(/Your Playlists/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Playlist 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Playlist 2/i)).toBeInTheDocument();
        });
    });

    it('should create a new playlist', async () => {
        const createPlaylistMock = useCreatePlaylist().createPlaylist;
        render(<UserHome />);

        fireEvent.click(screen.getByText(/Add Playlist/i));

        const input = screen.getByPlaceholderText(/Enter playlist name/i);
        fireEvent.change(input, { target: { value: 'New Playlist' } });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => {
            expect(createPlaylistMock).toHaveBeenCalledWith('userId1', 'New Playlist');
        });
    });
});