import Header from "../components/NavBar";
import MainText from "../components/MainText";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Home() {
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code) {
            axios.get(`http://localhost:5001/spotify/auth/spotify`, {
                params: { code }
            })
            .then(response => {
                console.log('Token exchange response:', response.data);
                // Optionally handle the response data
                // For example, store the token in local storage or context

                // Redirect to the user home page
                navigate('/userhome');
            })
            .catch(error => {
                console.error('Error exchanging token:', error);
            });
        }
    }, [navigate]);

    const handleGoToCreateAccount = () => {
        navigate('/CreateAccount');
    };
    return (
        <div>
            <Header />
            <MainText mainText="Enhance your musical experience by creating sorting your playlists based on various musical attributes like tempo, key, camelot, energy, and more." />
            <Button buttonText="Get Started." onClick={handleGoToCreateAccount} />
        </div>
    );
}

export default Home