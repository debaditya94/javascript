import { ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    itemList: []
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                itemList: state.itemList.concat({
                    key: Math.random(),
                    item: action.data
                })
            };
        case DELETE_ITEM:
            return {
                ...state,
                itemList: state.itemList.filter(item => item.key !== action.key)
            };
        default:
            return state;
    }
};

export default itemReducer;