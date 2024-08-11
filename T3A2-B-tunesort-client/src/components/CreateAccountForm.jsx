import { useState } from 'react';
import useCreateUser from '../hooks/useCreateUser';

function CreateAccountForm() {
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
        <div className="max-w-lg mx-auto p-8  mt-8">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="email"
                        id="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border-2 rounded-full shadow-md focus:outline-none border-[#5e843e] placeholder-gray-400 text-lg"
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
                        className="w-full p-4 border-2 rounded-full shadow-md focus:outline-none border-[#5e843e] placeholder-gray-400 text-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 text-lg"
                    disabled={loading}
                >
                    Create Account
                </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mt-4 text-center">User created successfully!</p>}
        </div>
    );
}

export default CreateAccountForm;
