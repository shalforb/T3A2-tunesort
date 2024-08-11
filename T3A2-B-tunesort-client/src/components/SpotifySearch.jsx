import React, { useState } from 'react';
import axios from 'axios';
import useAddTrack from '../hooks/useAddTrack';
import { HiOutlineSearch } from 'react-icons/hi';

const SpotifySearch = ({ onTrackSelect, playlistId }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const { addTrack, loading, error: addTrackError, success } = useAddTrack();

    const handleSearch = async () => {
        if (!query.trim()) {
            setError('Please enter a valid search term.');
            return;
        }
        setError(null);

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
            setQuery(''); // Clear the input after search

        } catch (error) {
            console.error('Error searching Spotify:', error.message);
        }
    };

    const handleAddTrack = async (track) => {
        try {
            const artistName = track.artists.map(artist => artist.name).join(', ');
            const trackName = track.name;
            const spotifyId = track.id;

            const response = await addTrack(playlistId, artistName, trackName, spotifyId);
            console.log('Track added to playlist:', response);
        } catch (error) {
            console.error('Error adding track to playlist:', error.message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleIconClick = () => {
        setIsClicked(true);
        handleSearch();
        setTimeout(() => {
            setIsClicked(false);
        }, 300);
    };

    return (
        <div className="flex-grow">
            <div className="flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search by title, artist or album"
                    className="flex-grow p-3 border-2 rounded-full shadow-lg focus:outline-none border-[#5e843e] placeholder-gray-400"
                />
                <button
                    onClick={handleIconClick}
                    className="ml-2 p-2 rounded-full transition-colors focus:outline-none"
                >
                    <HiOutlineSearch
                        size={34}
                        className={`transform transition-transform duration-300 ${
                            isClicked ? 'scale-125 rotate-12 text-[#5e843e]' : 'text-gray-800'
                        }`}
                    />
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <ul className="mt-4">
                {results.map((track) => (
                    <li key={track.id} className="mb-2">
                        <div className="flex justify-between items-center">
                            <span>
                                {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                            </span>
                            <button 
                                onClick={() => handleAddTrack(track)} 
                                className="ml-4 bg-green-500 text-white px-3 py-1 rounded-full"
                            >
                                Add to Playlist
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifySearch;
