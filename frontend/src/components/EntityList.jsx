import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { loadEntitiesAction } from '../store/reducers';
import Button from '../UI/Button/Button';

const EntityList = () => {
    const dispatch = useDispatch();
    const entities = useSelector(state => state.entities);

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

    return (
        <div className='enetities'>
            <table className="entity-table">
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
                                <div class="verticalLine">
                                    <Button cls='button edit'>Edit</Button>
                                </div>
                                <div class="verticalLine">
                                    <Button cls='button'>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EntityList;