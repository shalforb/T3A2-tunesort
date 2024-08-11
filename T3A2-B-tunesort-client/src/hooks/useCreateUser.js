// src/hooks/useCreateUser.js
import { useState } from 'react';

const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createUser = async (email, password) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Server response:', res);

            if (res.ok) {
                const data = await res.json();
                setSuccess(true);
                return data;
            } else {
                const errorData = await res.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error, success };
};

export default useCreateUser;
