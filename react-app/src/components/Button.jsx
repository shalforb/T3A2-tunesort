

function Button({ buttonText, onClick, className }) {
    return (
        <button onClick={onClick} className={className}>
            {buttonText}
        </button>
    );
}

export default Button