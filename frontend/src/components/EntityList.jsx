import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadEntitiesAction, deleteEntityAction, updateEntityAction, createEntityAction } from '../store/reducers';
import Button from '../UI/Button/Button';
import InputTr from './InputTr';
import InfoTr from './InfoTr';

const EntityList = () => {
    const dispatch = useDispatch();
    const entities = useSelector(state => state.entities);

    const [editingId, setEditingId] = useState();
    const [editedEntities, setEditedEntities] = useState({});

    const [isAdding, setIsAdding] = useState(false);
    const [newEntity, setNewEntity] = useState({
        name: '',
        x: 0,
        y: 0,
        labels: ''
    });

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
            setEditedEntities({});
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const handleNewEntityInputChange = (event) => {
        const { name, value } = event.target;
        setNewEntity({ ...newEntity, [name]: value });
    };

    const addNewEntity = async () => {
        try {
            await axios.post('http://localhost:3001/entities', newEntity);
            dispatch(createEntityAction(newEntity));
            cancelAddEntity();
            const updatedEntitiesResult = await axios.get('http://localhost:3001/entities');
            dispatch(loadEntitiesAction(updatedEntitiesResult.data));

        } catch (error) {
            console.error('Error adding new entity:', error);
        }
    };

    const cancelAddEntity = () => {
        setIsAdding(false);
        setNewEntity({ name: '', x: 0, y: 0, labels: '' }); // Reset the newEntity state
        setEditingId(null);
        setEditedEntities({});
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

                    {!isAdding ? (
                        <tr>
                            <td>
                                <Button cls={'round-button'} change={() => setIsAdding(true)}>
                                    <span className="plus-sign">+</span>
                                </Button>
                            </td>

                        </tr>
                    ) : (
                        <InputTr
                            inputChange={handleNewEntityInputChange}
                            saveButton={addNewEntity}
                            cancelButton={cancelAddEntity}
                            editedEntities={newEntity}
                            entity={newEntity}>
                        </InputTr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default EntityList;