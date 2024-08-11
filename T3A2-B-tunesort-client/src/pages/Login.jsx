import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import MainText from "../components/MainText";


function Login() {
    return (
        <div>
            <NavBar />
            <MainText mainText="Log in." className="text-[64px]" />
            <LoginForm />
        </div>
    );
}

export default Login;