import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import useGetPlaylistById from '../hooks/useGetPlaylistById';
import SpotifySearch from '../components/SpotifySearch';
import axios from 'axios';

const PlaylistDetail = () => {
    const { id } = useParams();
    const { getPlaylistById, playlist, loading, error } = useGetPlaylistById();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        getPlaylistById(id);

        // Fetch the Spotify access token
        axios.get('/spotify/token') // Adjust this route based on your backend setup
            .then(response => {
                setAccessToken(response.data.access_token);
            })
            .catch(error => {
                console.error('Error fetching Spotify token:', error);
            });
    }, [id]);

    const handleTrackSelect = async (track) => {
        try {
            await axios.post(`/playlists/${id}/tracks`, {
                trackId: track.id
            });
            // Refresh the playlist after adding the track
            getPlaylistById(id);
        } catch (err) {
            console.error('Error adding track:', err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <NavBar />
            <h1 className="text-2xl font-bold">Playlist: {playlist?.name}</h1>
     
                <SpotifySearch onTrackSelect={handleTrackSelect} accessToken={accessToken} playlistId={id} />
            
            <table className="min-w-full mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Track Name</th>
                        <th className="border border-gray-300 p-2">Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {playlist?.tracks.map((track, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{track.name}</td>
                            <td className="border border-gray-300 p-2">{track.artist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistDetail;
