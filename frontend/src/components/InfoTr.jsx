import Button from "../UI/Button/Button";

const InfoTr = ({ editButton, deleteButton, entity }) => {
    return (
        <tr>
            <td>{entity.name}</td>
            <td>
                {entity.x}
            </td>
            <td>
                {entity.y}
            </td>
            <td>{entity.labels}</td>
            <td>
                <div className="verticalLine">
                    <Button cls='button edit' change={editButton} id={entity.id}>Edit</Button>
                </div>
                <div className="verticalLine">
                    <Button cls='button' change={deleteButton} id={entity.id}>Delete</Button>
                </div>
            </td>
        </tr>
    )
}

export default InfoTr;