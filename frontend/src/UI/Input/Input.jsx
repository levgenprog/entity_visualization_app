import './Input.css'

const Input = ({ change, ...props }) => {
    return (
        <input type={props.type} name={props.name} className={props.cls}
            value={props.value}
            onChange={(event) => change(event, props.id)} />
    )
}

export default Input;