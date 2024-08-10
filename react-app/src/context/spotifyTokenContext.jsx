import { createContext, useState, useContext } from 'react';

const spotifyTokenContext = createContext();

export const SpotifyTokenProvider = ({ children }) => {
    const [tokens, setTokens] = useState({
        accessToken: null,
        refreshToken: null,
    });

    const updateTokens = (accessToken, refreshToken) => {
        setTokens({ accessToken, refreshToken });
        localStorage.setItem('spotifyAccessToken', accessToken);
        localStorage.setItem('spotifyRefreshToken', refreshToken);
    };

    return (
        <spotifyTokenContext.Provider value={{ tokens, updateTokens }}>
            {children}
        </spotifyTokenContext.Provider>
    );
};

export const useSpotifyTokens = () => useContext(spotifyTokenContext);
