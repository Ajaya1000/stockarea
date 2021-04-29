import Actions from '../action';
import Warehouses from '../../assets/warehouses.json';

const defaultState = {
    items: Warehouses,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.Types.CREATE_ITEM: {
            console.log(action);
            const newState = state;
            return newState;
        }
        case Actions.Types.UPDATE_ITEM: {
            console.log(action);
            const newState = state;
            return newState;
        }
        case Actions.Types.DELETE_ITEM: {
            console.log(action);
            const newState = state;
            return newState;
        }
        default: {
            return state;
        }
    }
};
export default reducer;
