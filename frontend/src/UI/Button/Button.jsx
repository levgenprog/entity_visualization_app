import './Button.css';

const Button = ({ cls, children }) => {
    return (
        <button className={cls}>
            {children}
        </button>
    );
}

export default Button;