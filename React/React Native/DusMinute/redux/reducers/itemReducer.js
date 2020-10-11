import item from '../../components/item';
import { ADD_ITEM, DELETE_ITEM, CLEAR_CART, CHANGE_ITEM_QUANTITY } from '../actions/types';

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
                itemList: state.itemList.filter(prod => prod.item.item.id !== action.id)
            };
        case CLEAR_CART: 
            return {
                ...state,
                itemList: []
            };
        case CHANGE_ITEM_QUANTITY:
            const changedItemList = state.itemList.map((prod) => {
                if (prod.item.item.id === action.id) {
                    prod.item.qty = action.quantity;
                    return prod;
                } else {
                    return prod;
                }
            })
            return {
                ...state,
                itemList: changedItemList
            };
        default:
            return state;
    }
};

export default itemReducer;