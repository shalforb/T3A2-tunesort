import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext"; // Import the useUser hook

function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useUser(); // Access user and logout from context

    const handleGoHome = () => {
        navigate('/');
    }

    const handleGotoLogin = () => {
        navigate('/login')
    };

    const handleLogout = () => {
        logout(); // Logout the user
        navigate('/login');
    };

    return (
        <div>
            <header className="bg-black text-white flex items-center justify-between p-4 relative">
                <Button className="text-lime-500 text-2xl font-bold" onClick={handleGoHome} buttonText="Tunesort" />
                {user ? ( // Check if user is logged in
                    <Button className="text-lime-500 text-2xl font-bold" onClick={handleLogout} buttonText="Logout" />
                ) : (
                    <Button className="text-lime-500 text-2xl font-bold" onClick={handleGotoLogin} buttonText="Login" />
                )}
            </header>
        </div>
    );
}

export default NavBar;
