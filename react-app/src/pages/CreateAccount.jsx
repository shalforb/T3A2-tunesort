import NavBar from "../components/NavBar";
import CreateAccountForm from "../components/CreateAccountForm";
import MainText from "../components/MainText";


function CreateAccount() {
    return (
        <div>
            <NavBar />
            <MainText mainText="Create Account." />
            <CreateAccountForm />
        </div>
    );
}

export default CreateAccount;