import Navbar from "../components/NavBar";
import MainText from "../components/MainText";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useExchangeSpotifyToken from "../hooks/useExchangeSpotifyTokens";
import { useEffect } from "react";
import { useSpotifyTokens } from "../context/spotifyTokenContext";
import { useUser } from "../context/userContext";
import { IoIosMusicalNotes } from "react-icons/io";

function Welcome() {
    const navigate = useNavigate();
    const { exchangeSpotifyToken } = useExchangeSpotifyToken();
    const { updateTokens } = useSpotifyTokens();
    const { user } = useUser();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        const fetchTokens = async () => {
            if (code) {
                const result = await exchangeSpotifyToken(code);

                if (result.success) {
                    updateTokens(result.accessToken, result.refreshToken);
                    navigate('/userhome');
                } else {
                    console.error('Error exchanging token:', result.error);
                }
            }
        };

        fetchTokens();
    }, [code, exchangeSpotifyToken, navigate, updateTokens]);

    const handleGoToCreateAccount = () => {
        navigate('/createaccount');
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <IoIosMusicalNotes className="text-[150px] md:text-[210px]" />
                <MainText 
                    mainText="Enhance your musical experience by creating and sorting your playlists based on various musical attributes like tempo, key, camelot, energy, and more." 
                    className="text-[24px] md:text-[36px] max-w-2xl"
                />
                <Button 
                    buttonText="Get Started." 
                    className="mt-8 py-4 px-16 md:py-6 md:px-24 bg-green-600 hover:bg-green-700 text-[18px] md:text-[24px] text-white rounded-md" 
                    onClick={handleGoToCreateAccount} 
                />
            </div>
        </div>
    );
}

export default Welcome;
