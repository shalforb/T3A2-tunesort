import { useState } from 'react';

function useLoginUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const loginUser = async (email, password) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5001/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid email or password');
            }

            const data = await response.json();
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message || 'Invalid email or password');
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, loading, error, success };
}

export default useLoginUser;
