import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { loadEntitiesAction } from '../store/reducers';

const EntityList = () => {
    const dispatch = useDispatch();
    const entities = useSelector(state => state.entities);

    // Load the entities 
    useEffect(() => {
        const fetchEntities = async () => {
            try {
                let result = await axios.get('http://localhost:3001/entities');
                dispatch(loadEntitiesAction(result.data));
                console.log(entities);
            }
            catch (error) {
                console.error('Failed to load entities', error);
            }
        }

        fetchEntities();
    }, [dispatch]);

    return (
        <div className='enetities'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Coordinate</th>
                        <th>Labels</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity.id}>
                            <td>{entity.name}</td>
                            <td>
                                {entity.x}, {entity.y}
                            </td>
                            <td>{entity.labels}</td>
                            <td>
                                <button>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EntityList;