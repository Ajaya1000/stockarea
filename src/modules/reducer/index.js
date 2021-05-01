import Actions from '../action';
import Warehouses from '../../assets/warehouses.json';

const defaultState = {
    items: Warehouses,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.Types.CREATE_ITEM: {
            const newState = state;
            return newState;
        }
        case Actions.Types.UPDATE_ITEM: {
            // create a new list by updating the existing one
            const newItems = state.items.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
            const newState = {
                items: newItems,
            };
            return newState;
        }
        case Actions.Types.DELETE_ITEM: {
            // filter outs rest of the items except the deleted one
            const newItems = state.items.filter(
                (item) => item.id !== action.payload.id
            );
            const newState = {
                items: newItems,
            };
            return newState;
        }
        default: {
            return state;
        }
    }
};
export default reducer;
