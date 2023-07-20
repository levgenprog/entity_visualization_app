import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const InputTr = ({ inputChange, saveButton, cancelButton, ...props }) => {
    return (
        <tr key={props.entity?.id}>
            <td>
                <Input type='text' name='name' cls='input'
                    value={props.editedEntities[props.entity.id]?.name || props.entity.name}
                    change={inputChange} id={props.entity?.id}>
                </Input>
            </td>
            <td>
                <Input type='number' name='x' cls='input'
                    value={props.editedEntities[props.entity.id]?.x || props.entity.x}
                    change={inputChange} id={props.entity?.id}>
                </Input>
            </td>
            <td>
                <Input type='number' name='y' cls='input'
                    value={props.editedEntities[props.entity?.id]?.y || props.entity.y}
                    change={inputChange} id={props.entity?.id}>
                </Input>

            </td>
            <td>
                <Input type='text' name='labels' cls='input'
                    value={props.editedEntities[props.entity?.id]?.labels || props.entity.labels}
                    change={inputChange} id={props.entity?.id}>
                </Input>
            </td>
            <td>
                <div className="verticalLine">
                    <Button cls='button edit' change={saveButton} id={props.entity.id}>Save</Button>
                </div>
                <div className="verticalLine">
                    <Button cls='button' change={cancelButton}>Cancel</Button>
                </div>

            </td>
        </tr>
    )
}

export default InputTr;