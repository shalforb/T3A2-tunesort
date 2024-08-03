// src/components/Header.js
import { useState } from 'react';
import useCreateUser from '../hooks/useCreateUser'; // Import correctly

function Header() {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { createUser, loading, error, success } = useCreateUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await createUser(email, password);
        if (userData) {
            console.log('User created successfully:', userData);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div>
            <header className="bg-black text-white flex items-center justify-between p-4 relative">
                <h1 className="text-lime-500 text-2xl font-bold">Tunesort</h1>
            </header>
            <p className="border flex justify-center p-36 text-[64px] font-serif">Create an Account.</p>
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
                {success && <p className="text-green-500 mt-2">User created successfully!</p>}
            </div>
        </div>
    );
}

export default Header;
