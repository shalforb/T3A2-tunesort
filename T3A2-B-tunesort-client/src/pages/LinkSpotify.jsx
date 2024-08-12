import NavBar from "../components/NavBar";
import MainText from "../components/MainText";
import Button from "../components/Button";
import { FaSpotify } from "react-icons/fa";

function LinkSpotify() {
    const handleLinkSpotify = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/spotify/authorize`;
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <FaSpotify className="text-[150px] md:text-[210px] text-green-600" />
                <MainText 
                    mainText="Tunesort is powered by Spotify's API, link your account below to get started." 
                    className="text-[24px] md:text-[36px] max-w-2xl"
                />
                <Button 
                    buttonText="Link Your Spotify" 
                    className="mt-8 py-4 px-16 md:py-6 md:px-24 bg-green-600 hover:bg-green-700 text-[18px] md:text-[24px] text-white rounded-md" 
                    onClick={handleLinkSpotify} 
                />
            </div>
        </div>
    );
}

export default LinkSpotify;
