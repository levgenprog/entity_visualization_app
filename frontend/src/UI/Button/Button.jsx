import './Button.css';

const Button = ({ cls, change, id, children }) => {
    return (
        <button className={cls} onClick={() => change(id)}>
            {children}
        </button>
    );
}

export default Button;