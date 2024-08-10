import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import MainText from "../components/MainText";


function Login() {
    return (
        <div>
            <NavBar />
            <MainText mainText="Log in." />
            <LoginForm />
        </div>
    );
}

export default Login;