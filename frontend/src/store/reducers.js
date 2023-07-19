const LOAD_ENTITIES = 'LOAD_ENTITIES';
const CREATE_ENTITY = 'CREATE_ENTITY';
const UPDATE_ENTITY = 'UPDATE_ENTITY';
const DELETE_ENTITY = 'DELETE_ENTITY';

export const loadEntitiesAction = (payload) => ({
    type: LOAD_ENTITIES, payload
});

export const createEntityAction = (payload) => ({
    type: CREATE_ENTITY, payload
})

export const updateEntityAction = (payload) => ({
    type: UPDATE_ENTITY, payload
})

export const deleteEntityAction = (payload) => ({
    type: DELETE_ENTITY, payload
})

const initialState = {
    entities: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ENTITIES:
            return { ...state, entities: action.payload };
        case CREATE_ENTITY:
            return { ...state, entities: [...state.entities, action.payload] };
        case UPDATE_ENTITY:
            return {
                ...state,
                entities: state.entities.map((entity) =>
                    entity.id === action.payload.id ? action.payload : entity
                )
            };
        case DELETE_ENTITY:
            return {
                ...state,
                entities: state.entities.filter((entity) =>
                    entity.id !== action.payload
                )
            };
        default:
            return state;
    }
}

export default reducer;