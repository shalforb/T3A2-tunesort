import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token); 
        if (token) {
            try {
                const response = await fetch('http://localhost:5001/users/api/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetch response status:', response.status);
                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data:', userData); 
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user data');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
