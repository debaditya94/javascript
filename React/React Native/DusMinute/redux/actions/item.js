
import {ADD_ITEM, DELETE_ITEM, CLEAR_CART} from './types';

export const addItem = (item) => (
    {
        type: ADD_ITEM,
        data: item
    }
);

export const deleteItem = (key) => (
    {
        type: DELETE_ITEM,
        key: key
    }
);

export const clearCart = () => (
    {
        type: CLEAR_CART
    }
);