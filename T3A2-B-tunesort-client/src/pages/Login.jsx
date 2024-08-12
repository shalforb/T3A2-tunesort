import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import MainText from "../components/MainText";

function Login() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <MainText mainText="Log in." className="text-[32px] md:text-[48px]" />
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
