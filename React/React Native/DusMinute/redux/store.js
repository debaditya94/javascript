import { createStore, combineReducers } from 'redux';
import itemReducer from './reducers/itemReducer';

const rootReducer = combineReducers({
    item: itemReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;