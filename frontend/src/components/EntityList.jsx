import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadEntitiesAction, deleteEntityAction, updateEntityAction } from '../store/reducers';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const EntityList = () => {
    const dispatch = useDispatch();
    const entities = useSelector(state => state.entities);

    const [editingId, setEditingId] = useState();
    const [editedEntities, setEditedEntities] = useState({});

    // Load the entities 
    useEffect(() => {
        const fetchEntities = async () => {
            try {
                let result = await axios.get('http://localhost:3001/entities');
                dispatch(loadEntitiesAction(result.data));
            }
            catch (error) {
                console.error('Failed to load entities', error);
            }
        }

        fetchEntities();
    }, [dispatch]);

    const editEntity = (id) => {
        setEditingId(id);
        setEditedEntities({ ...editedEntities, [id]: { ...entities.find(entity => entity.id === id) } });
    }

    const handleInputChange = (event, id) => {
        const { name, value } = event.target;
        setEditedEntities({
            ...editedEntities,
            [id]: { ...editedEntities[id], [name]: value },
        });
    };

    const saveChanges = async (id) => {
        try {
            const updatedEntity = editedEntities[id];
            await axios.put(`http://localhost:3001/entities/${id}`, updatedEntity);
            dispatch(updateEntityAction(updatedEntity));
            setEditingId(null);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const deleteEntity = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/entities/${id}`);
            dispatch(deleteEntityAction(id));
        } catch (error) {
            console.error('Error deleting entity:', error);
        }
    }

    return (
        <div className='enetities'>
            <table className="entity-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Labels</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        editingId === entity.id ? (
                            <tr key={entity.id}>
                                <td>
                                    <Input type='text' name='name' cls='input'
                                        value={editedEntities[entity.id]?.name || entity.name}
                                        change={handleInputChange} id={entity.id}>
                                    </Input>
                                </td>
                                <td>
                                    <Input type='number' name='x' cls='input'
                                        value={editedEntities[entity.id]?.x || entity.x}
                                        change={handleInputChange} id={entity.id}>
                                    </Input>
                                </td>
                                <td>
                                    <input type="number" name="y" className='input'
                                        value={editedEntities[entity.id]?.y || entity.y}
                                        onChange={(event) => handleInputChange(event, entity.id)} />

                                </td>
                                <td>
                                    <Input type='text' name='labels' cls='input'
                                        value={editedEntities[entity.id]?.labels || entity.labels}
                                        change={handleInputChange} id={entity.id}>
                                    </Input>
                                </td>
                                <td>
                                    <div className="verticalLine">
                                        <Button cls='button edit' change={saveChanges} id={entity.id}>Save</Button>
                                    </div>
                                    <div className="verticalLine">
                                        <Button cls='button' change={() => setEditingId(null)}>Cancel</Button>
                                    </div>

                                </td>
                            </tr>
                        ) : (
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
                                        <Button cls='button edit' change={editEntity} id={entity.id}>Edit</Button>
                                    </div>
                                    <div className="verticalLine">
                                        <Button cls='button' change={deleteEntity} id={entity.id}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EntityList;