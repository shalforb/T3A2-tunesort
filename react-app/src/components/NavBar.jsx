import Button from "./Button";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    }
    const handleGotoLogin = () => {
        navigate('/login')
    };
    return (
        <div>
            <header className="bg-black text-white flex items-center justify-between p-4 relative">
                <Button className="text-lime-500 text-2xl font-bold" onClick={handleGoHome} buttonText="Tunesort" />
                <Button className="text-lime-500 text-2xl font-bold" onClick={handleGotoLogin} buttonText="Login" />
            </header>
        </div>
    );
}

export default NavBar;
