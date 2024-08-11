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
    const { exchangeSpotifyToken, accessToken, refreshToken } = useExchangeSpotifyToken();
    const { updateTokens } = useSpotifyTokens();
    const { user } = useUser();
    

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        const fetchTokens = async () => {
            if (code) {
                const result = await exchangeSpotifyToken(code);

                // Always log the result and handle errors
                console.log('RESULT:', result);

                if (result.success) {
                    updateTokens(result.accessToken, result.refreshToken);

                    // Navigate to the user home page
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
        <div>
            
            <Navbar />
            <div className="flex items-center justify-center h-64">
                <IoIosMusicalNotes className="text-[210px]" />
            </div>
            <MainText mainText="Enhance your musical experience by creating and sorting your playlists based on various musical attributes like tempo, key, camelot, energy, and more." className="text-[36px]" />
            <div className="flex items-center justify-center ">
            <Button buttonText="Get Started." className=" py-8 px-36 bg-green-600 text-[24px] text-white rounded-md" onClick={handleGoToCreateAccount} />
            </div>
            
        </div>
    );
}

export default Welcome;
