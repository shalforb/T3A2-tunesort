import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGotoLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <header className="bg-black text-white flex items-center justify-between p-4 relative">
                <Button className="text-lime-500 text-2xl font-bold" onClick={handleGoHome} buttonText="Tunesort" />
                {user ? (
                    <Button className="text-white bg-green-600 hover:bg-green-700 text-xl font-bold py-2 px-4 rounded" onClick={handleLogout} buttonText="Logout" />
                ) : (
                    <Button className="text-white bg-green-600 hover:bg-green-700 text-xl font-bold py-2 px-4 rounded" onClick={handleGotoLogin} buttonText="Login" />
                )}
            </header>
        </div>
    );
}

export default NavBar;

