import { useEffect, useState } from 'react';
import MainText from '../components/MainText';
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useUser } from '../context/userContext';
import useCreatePlaylist from "../hooks/useCreatePlaylist";
import useGetUserPlaylists from '../hooks/useGetUserPlaylists';
import useDeletePlaylist from '../hooks/useDeletePlaylist';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline, IoMdTrash } from "react-icons/io";

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
        setIsFormVisible(!isFormVisible);
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

    return (
        <div className="min-h-screen flex flex-col relative">
            <NavBar />
            <div className="px-10 mt-8">
                <div className="flex justify-between items-center mb-4 relative">
                    <div className="flex items-center">
                        <MainText mainText="Your Playlists" className="text-[32px] md:text-[48px]" />
                        <div className="relative">
                            <Button onClick={handleButtonClick} className="text-4xl md:text-5xl text-gray-600 hover:text-gray-800 ml-4">
                                <IoIosAddCircleOutline />
                            </Button>
                            {playlists.length === 0 && (
                                <div className="absolute top-0 left-16 transform translate-y-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 shadow-lg z-10 transition-opacity duration-500 opacity-100 whitespace-nowrap fade-in">
                                    <p className="text-sm">Click here to make your first playlist</p>
                                </div>
                            )}

                        </div>
                        {isFormVisible && (
                            <form onSubmit={handleSubmit} className="ml-4 flex items-center">
                                <input
                                    type="text"
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value)}
                                    placeholder="Enter playlist name"
                                    className="w-64 p-3 border-2 rounded-full shadow-md focus:outline-none border-[#5e843e] placeholder-gray-400 text-lg"
                                />
                                <button 
                                    type="submit" 
                                    className="ml-2 px-4 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 text-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <hr className="border-t-2 border-gray-200 my-4" /> {/* Divider */}
            </div>
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10 pb-8">
                {playlists.map((playlist) => (
                    <div
                        key={playlist._id}
                        className="bg-[#f0f0f0] h-64 p-6 rounded-lg shadow-md cursor-pointer text-center relative hover:shadow-lg group flex items-center justify-center"
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
