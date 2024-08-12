import NavBar from "../components/NavBar";
import CreateAccountForm from "../components/CreateAccountForm";
import MainText from "../components/MainText";

function CreateAccount() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <MainText mainText="Create an Account." className="text-[32px] md:text-[48px]" />
                <CreateAccountForm />
            </div>
        </div>
    );
}

export default CreateAccount;
