import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useLoginUser from '../hooks/useLoginUser'; //

function LoginForm() {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, loading, error, success } = useLoginUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await loginUser(email, password);
        if (userData) {
            console.log('User logged in successfully:', userData);
            localStorage.setItem('token', userData.token); // Save the token
            navigate('/userhome'); // Redirect to homepage
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">Logged in successfully!</p>}
            </div>
        </div>
    );
}

export default LoginForm;
