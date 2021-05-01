import Actions from '../action';
import Warehouses from '../../assets/warehouses.json';

const defaultState = {
    items: Warehouses,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.Types.CREATE_ITEM: {
            // findouts the id with max value
            let maxxId = 0;
            state.items.forEach((item) => {
                if (item.id > maxxId) maxxId = item.id;
            });

            // assigns maxid+1  id value to the next item
            const newItem = { ...action.payload, id: maxxId + 1 };

            const newState = {
                items: [...state.items, newItem],
            };
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
