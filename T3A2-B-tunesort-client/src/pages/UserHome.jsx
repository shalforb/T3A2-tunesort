//UserHome.jsx

import { useEffect, useState } from 'react';
import MainText from '../components/MainText';
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useUser } from '../context/userContext';
import useCreatePlaylist from "../hooks/useCreatePlaylist";
import useGetUserPlaylists from '../hooks/useGetUserPlaylists';
import useDeletePlaylist from '../hooks/useDeletePlaylist';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline, IoMdTrash, IoIosRefresh } from "react-icons/io";

function UserHome() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const { user } = useUser();
    const { createPlaylist } = useCreatePlaylist();
    const { getUserPlaylists } = useGetUserPlaylists();
    const { deletePlaylist } = useDeletePlaylist();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (user?._id) {  
                const playlistData = await getUserPlaylists(user._id);
                setPlaylists(playlistData || []);
            }
        };
    
        fetchPlaylists();
    }, [user?._id, getUserPlaylists]);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCardClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const handleDelete = async (playlistId) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            try {
                await deletePlaylist(playlistId);
                setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
            } catch (error) {
                console.error('Error deleting playlist:', error);
            }
        }
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

    const handleLinkSpotify = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/spotify/authorize`;
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-between items-center px-10 mt-8 mb-4">
                <div className="flex items-center">
                    <MainText mainText="Your Playlists" className="text-[64px] inline-block" />
                    <Button onClick={handleButtonClick} className="text-5xl text-gray-600 hover:text-gray-800 ml-4">
                        <IoIosAddCircleOutline />
                    </Button>
                </div>
                <div className="flex items-center">
                    <Button onClick={handleLinkSpotify} className="text-5xl text-gray-600 hover:text-gray-800">
                        <IoIosRefresh />
                    </Button>
                </div>
                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="ml-4 flex items-center">
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Enter playlist name"
                            className="border p-2 rounded-md"
                        />
                        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                            Submit
                        </button>
                    </form>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
                {playlists.map((playlist) => (
                    <div
                        key={playlist._id}
                        className="bg-[#FAF9F6] p-6 rounded-lg shadow-md cursor-pointer text-center relative hover:shadow-lg group"
                        onClick={() => handleCardClick(playlist._id)}
                    >
                        <h3 className="text-xl font-semibold">{playlist.name}</h3>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents triggering the card click
                                    handleDelete(playlist._id);
                                }}
                                className="text-red-600 hover:text-red-800"
                            >
                                <IoMdTrash size={24} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserHome;
