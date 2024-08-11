import axios from 'axios';

const useDeletePlaylist = () => {
    const deletePlaylist = async (playlistId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
            const response = await axios.delete(`http://localhost:5001/playlists/${playlistId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting playlist:', error);
            throw error;
        }
    };

    return { deletePlaylist };
};

export default useDeletePlaylist;
