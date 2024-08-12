import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import useGetPlaylistById from '../hooks/useGetPlaylistById';
import SpotifySearch from '../components/SpotifySearch';
import axios from 'axios';
import SortableTableHeader from '../components/SortableTableHeader';
import useDeleteTrack from '../hooks/useDeleteTrack';
import { HiOutlineTrash, HiArrowLeft } from 'react-icons/hi';
import useAddTrack from '../hooks/useAddTrack'; // Import the useAddTrack hook

const PlaylistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { getPlaylistById, playlist, loading, error, setPlaylist } = useGetPlaylistById(); // Added setPlaylist to update the playlist
    const [accessToken, setAccessToken] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const { deleteTrack } = useDeleteTrack();
    const { addTrack } = useAddTrack(); // Use the addTrack function from the useAddTrack hook

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
            const newTrack = await addTrack(id, track.artist, track.name, track.id);
            if (newTrack) {
                setPlaylist(prevPlaylist => ({
                    ...prevPlaylist,
                    tracks: [...prevPlaylist.tracks, newTrack] // Append the new track to the current tracks
                }));
            }
        } catch (err) {
            console.error('Error adding track:', err.message);
        }
    };

    const handleDeleteTrack = async (trackId) => {
        try {
            const deletedTrack = await deleteTrack(id, trackId);
            if (deletedTrack) {
                setPlaylist(prevPlaylist => ({
                    ...prevPlaylist,
                    tracks: prevPlaylist.tracks.filter(track => track.spotifyId !== trackId) // Remove the deleted track
                }));
            }
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
            
            {/* Container for the title, search bar, and back button */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto mt-4 mb-2 px-4">
                {/* Playlist Title on the far left */}
                <h1 className="text-2xl font-bold flex-shrink-0">{playlist?.name}</h1>
                
                {/* Search bar centered */}
                <div className="flex-grow mx-4">
                    <SpotifySearch onTrackSelect={handleTrackSelect} accessToken={accessToken} playlistId={id} />
                </div>

                {/* Back button on the far right */}
                <button
                    onClick={() => navigate('/userhome')}
                    className="p-2 rounded-full transition-colors focus:outline-none flex-shrink-0"
                >
                    <HiArrowLeft size={34} className="text-gray-800 hover:text-gray-600" />
                </button>
            </div>

            <table className="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr>
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
                            label="Acousticness"
                            sortKey="acousticness"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Danceability"
                            sortKey="danceability"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Energy"
                            sortKey="energy"
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
                            label="Camelot"
                            sortKey="camelot"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <SortableTableHeader
                            label="Tempo"
                            sortKey="tempo"
                            sortConfig={sortConfig}
                            requestSort={requestSort}
                        />
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTracks.map((track, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{track.name}</td>
                            <td className="border border-gray-300 p-2">{track.artist}</td>
                            <td className="border border-gray-300 p-2">{track.acousticness}</td>
                            <td className="border border-gray-300 p-2">{track.danceability}</td>
                            <td className="border border-gray-300 p-2">{track.energy}</td>
                            <td className="border border-gray-300 p-2">{track.key}</td>
                            <td className="border border-gray-300 p-2">{track.camelot}</td>
                            <td className="border border-gray-300 p-2">{track.tempo}</td>
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
