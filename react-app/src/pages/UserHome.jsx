import { useEffect, useState } from 'react';
import MainText from '../components/MainText';
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useUser } from '../context/userContext';
import useCreatePlaylist from "../hooks/useCreatePlaylist";
import useGetUserPlaylists from '../hooks/useGetUserPlaylists';
import { useSpotifyTokens } from '../context/spotifyTokenContext';
import { useNavigate } from 'react-router-dom';

function UserHome() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const { user, logout } = useUser();
    const { createPlaylist } = useCreatePlaylist();
    const { getUserPlaylists } = useGetUserPlaylists();
    const { tokens } = useSpotifyTokens();
    const navigate = useNavigate();

    const handleLinkSpotify = () => {
        window.location.href = 'http://localhost:5001/spotify/authorize';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (user?._id && tokens.accessToken) {
                const playlistData = await getUserPlaylists(user._id);
                setPlaylists(playlistData || []);
            }
        };

        fetchPlaylists();
    }, [user?._id, tokens.accessToken]);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCardClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = user?._id;

        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            const playlistData = await createPlaylist(userId, playlistName);
            setPlaylists([...playlists, playlistData]);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }

        setIsFormVisible(false);
    };

    return (
        <div>
            <NavBar />
            <Button buttonText="Logout" onClick={handleLogout} />
            <Button buttonText="Link Your Spotify" onClick={handleLinkSpotify} />
            <MainText mainText="Your Playlists" />
            <div className="border flex justify-center items-center">
                <Button buttonText="+" onClick={handleButtonClick} className='text-red-700 text-4xl' />
                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="ml-4">
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Enter playlist name"
                            className="border p-2"
                        />
                        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">Submit</button>
                    </form>
                )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {playlists.map((playlist) => (
                    <div
                        key={playlist._id}
                        className="border p-4 cursor-pointer"
                        onClick={() => handleCardClick(playlist._id)}
                    >
                        <h3 className="text-lg font-bold">{playlist.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHome;