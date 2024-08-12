function MainText({ mainText, className }) {
    return (
        <div>
            <p className={`flex justify-center p-4 text-center font-serif ${className}`}>
                {mainText}
            </p>
        </div>
    );
}

export default MainText;
