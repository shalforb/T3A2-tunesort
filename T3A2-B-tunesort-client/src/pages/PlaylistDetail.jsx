import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import MainText from "../components/MainText";
import useGetPlaylistById from '../hooks/useGetPlaylistById';
import SpotifySearch from '../components/SpotifySearch';
import axios from 'axios';
import SortableTableHeader from '../components/SortableTableHeader';
import useDeleteTrack from '../hooks/useDeleteTrack';
import { HiOutlineTrash, HiArrowLeft } from 'react-icons/hi';

const PlaylistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { getPlaylistById, playlist, loading, error } = useGetPlaylistById();
    const [accessToken, setAccessToken] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const { deleteTrack } = useDeleteTrack();

    useEffect(() => {
        getPlaylistById(id);

        axios.get('/spotify/token')
            .then(response => {
                setAccessToken(response.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching Spotify token:', error);
            });
    }, [id]);

    const handleTrackSelect = async (track) => {
        try {
            await axios.post(`/playlists/${id}`, {
                trackId: track.id
            });
            getPlaylistById(id);
        } catch (err) {
            console.error('Error adding track:', err.message);
        }
    };

    const handleDeleteTrack = async (trackId) => {
        try {
            await deleteTrack(id, trackId);
            getPlaylistById(id);
        } catch (err) {
            console.error('Error deleting track:', err.message);
        }
    };

    const sortTracks = (tracks) => {
        if (sortConfig !== null) {
            return [...tracks].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return tracks;
    };

    const sortedTracks = playlist?.tracks ? sortTracks(playlist.tracks) : [];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <NavBar />
            
            <div className="flex justify-between items-center w-full mt-4 mb-4 px-0"> {/* Removed padding */}
                {/* Align title to the left */}
                <div className="flex items-center pl-4">
                    <MainText mainText={playlist?.name} className="text-4xl font-bold" />
                </div>
                
                {/* Center the search bar */}
                <div className="flex-grow mx-4 flex justify-center">
                    <SpotifySearch onTrackSelect={handleTrackSelect} accessToken={accessToken} playlistId={id} />
                </div>

                {/* Align back button to the right */}
                <div className="flex items-center pr-4">
                    <button
                        onClick={() => navigate('/userhome')}
                        className="p-2 rounded-full transition-colors focus:outline-none"
                    >
                        <HiArrowLeft size={34} className="text-gray-800 hover:text-gray-600" />
                    </button>
                </div>
            </div>

            <hr className="border-t-2 border-gray-200 my-4" />

            <table className="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#e1e5d4]"> {/* Subtle stone/earthy green */}
                        <SortableTableHeader
                            label="Track Name"
                            sortKey="name"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Artist"
                            sortKey="artist"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="BPM"
                            sortKey="tempo"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Camelot"
                            sortKey="camelot"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Key"
                            sortKey="key"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Energy"
                            sortKey="energy"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTracks.map((track, index) => (
                        <tr key={index} className={`odd:bg-[#f0f0ec] even:bg-[#e8e8e5]`}>
                            <td className="border border-gray-300 p-2">{track.name}</td>
                            <td className="border border-gray-300 p-2">{track.artist}</td>
                            <td className="border border-gray-300 p-2 text-center">{track.tempo}</td>
                            <td className="border border-gray-300 p-2 text-center">{track.camelot}</td>
                            <td className="border border-gray-300 p-2 text-center">{track.key}</td>
                            <td className="border border-gray-300 p-2 text-center">{track.energy}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button 
                                    onClick={() => handleDeleteTrack(track.spotifyId)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <HiOutlineTrash size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistDetail;
