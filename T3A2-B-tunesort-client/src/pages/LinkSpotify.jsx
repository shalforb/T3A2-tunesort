import NavBar from "../components/NavBar";
import MainText from "../components/MainText";
import Button from "../components/Button";
import { FaSpotify } from "react-icons/fa";



function LinkSpotify() {
    
    const handleLinkSpotify = () => {
        window.location.href = 'http://localhost:5001/spotify/authorize';
    };
    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center h-64">
            <FaSpotify className="text-[210px] text-green-600" />
            </div>
            <MainText mainText="Tunesort is powered by Spotify's API, link your account below to get started." className="text-[36px]" />
            <div className="flex justify-center">
            <Button buttonText="Link Your Spotify" className=" py-8 px-36 bg-green-600 text-[24px] text-white rounded-md" onClick={handleLinkSpotify} />
            </div>

        </div>
    );
}

export default LinkSpotify;