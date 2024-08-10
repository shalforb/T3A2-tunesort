import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import UserHome from './pages/UserHome'
import PlaylistDetail from './pages/PlaylistDetail'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/playlist/:id" element={<PlaylistDetail />} />
    </Routes>
  )
}

export default App
