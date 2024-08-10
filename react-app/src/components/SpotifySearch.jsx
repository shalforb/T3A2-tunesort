import { useState } from 'react';
import axios from 'axios';

const SpotifySearch = ({ onTrackSelect, accessToken }) => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTracks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: query,
                    type: 'track',
                    limit: 10
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTracks(response.data.tracks.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for tracks"
            />
            <button onClick={searchTracks}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                        <button onClick={() => onTrackSelect(track)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifySearch;
