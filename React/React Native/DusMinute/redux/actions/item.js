
import {ADD_ITEM, DELETE_ITEM, CLEAR_CART, CHANGE_ITEM_QUANTITY} from './types';

export const addItem = (item) => (
    {
        type: ADD_ITEM,
        data: item
    }
);

export const deleteItem = (id) => (
    {
        type: DELETE_ITEM,
        id: id
    }
);

export const clearCart = () => (
    {
        type: CLEAR_CART
    }
);

export const changeItemQuantity = (id, qty) => (
    {
        type: CHANGE_ITEM_QUANTITY,
        id: id,
        quantity: qty
    }
);