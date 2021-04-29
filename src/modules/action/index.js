const Types = {
    CREATE_ITEM: 'CREATE_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
};

const createItem = (item) => ({
    type: Types.CREATE_ITEM,
    payload: item,
});

const updateItem = (item) => ({
    type: Types.UPDATE_ITEM,
    payload: item,
});

const deleteItem = (item) => ({
    type: Types.DELETE_ITEM,
    payload: item,
});

export default {
    Types,
    createItem,
    updateItem,
    deleteItem,
};
