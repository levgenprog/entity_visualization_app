import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadEntitiesAction, deleteEntityAction, updateEntityAction } from '../store/reducers';
import Button from '../UI/Button/Button';
import InputTr from './InputTr';
import InfoTr from './InfoTr';

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
                            <InputTr
                                inputChange={handleInputChange}
                                saveButton={saveChanges}
                                cancelButton={() => setEditingId(null)}
                                editedEntities={editedEntities}
                                entity={entity} >
                            </InputTr>
                        ) : (
                            <InfoTr editButton={editEntity} deleteButton={deleteEntity} entity={entity} ></InfoTr>
                        )
                    ))}
                    <tr>
                        <Button cls={'round-button'}>
                            <span classNames="plus-sign">+</span>
                        </Button>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default EntityList;