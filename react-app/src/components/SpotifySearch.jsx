import { useState } from 'react';
import axios from 'axios';
import useAddTrack from '../hooks/useAddTrack';

const SpotifySearch = ({ onTrackSelect, playlistId }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { addTrack, loading, error, success } = useAddTrack();

    const handleSearch = async () => {
        try {
            const accessToken = localStorage.getItem('spotifyAccessToken');
            if (!accessToken) {
                console.error('No access token available');
                return;
            }
    
            const { data } = await axios.get('http://localhost:5001/spotify/search', {
                params: { q: query },
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
    
            if (!data.tracks || !data.tracks.items) {
                console.error('Invalid response from API', data);
                return;
            }
    
            setResults(data.tracks.items);
    
        } catch (error) {
            console.error('Error searching Spotify:', error.message);
        }
    };



    const handleAddTrack = async (track) => {
        try {
            const artistName = track.artists.map(artist => artist.name).join(', ');
            const trackName = track.name;
            
            const response = await addTrack(playlistId, artistName, trackName);
            console.log('Track added to playlist:', response);
        } catch (error) {
            console.error('Error adding track to playlist:', error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for songs"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                        <button onClick={() => handleAddTrack(track)}>Add to Playlist</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifySearch;
