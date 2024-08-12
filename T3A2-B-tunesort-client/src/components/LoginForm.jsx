import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useLoginUser from '../hooks/useLoginUser';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, loading, error, success } = useLoginUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await loginUser(email, password);
        if (userData) {
            console.log('User logged in successfully:', userData);
            localStorage.setItem('token', userData.token); 
            navigate('/linkspotify'); 
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="email"
                        id="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 md:p-4 border-2 rounded-full shadow-md focus:outline-none border-[#5e843e] placeholder-gray-400 text-base md:text-lg"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 md:p-4 border-2 rounded-full shadow-md focus:outline-none border-[#5e843e] placeholder-gray-400 text-base md:text-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 text-base md:text-lg"
                    disabled={loading}
                >
                    Login
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mt-4 text-center">Logged in successfully!</p>}
        </div>
    );
}

export default LoginForm;
