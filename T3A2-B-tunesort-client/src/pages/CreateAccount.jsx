import NavBar from "../components/NavBar";
import CreateAccountForm from "../components/CreateAccountForm";
import MainText from "../components/MainText";


function CreateAccount() {
    return (
        <div>
            <NavBar />
            <MainText mainText="Create Account." className="text-[64px]" />
            <CreateAccountForm />
        </div>
    );
}

export default CreateAccount;