//App.jsx

import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import LinkSpotify from './pages/LinkSpotify';
import UserHome from './pages/UserHome';
import PlaylistDetail from './pages/PlaylistDetail';
import { SpotifyTokenProvider } from './context/spotifyTokenContext';
import { UserProvider } from './context/userContext'; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap with UserProvider */}
      <SpotifyTokenProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/linkspotify" element={<LinkSpotify />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
        </Routes>
      </SpotifyTokenProvider>
    </UserProvider>
  );
}

export default App;
