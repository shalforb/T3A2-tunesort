function Button({ buttonText, onClick, className, children }) {
    return (
        <button onClick={onClick} className={className}>
            {children}
            {buttonText}
        </button>
    );
}

export default Button;
