import { createStore, combineReducers } from 'redux';
import { composeWithDevTools  } from 'redux-devtools-extension';
import itemReducer from './reducers/itemReducer';

const rootReducer = combineReducers({
    item: itemReducer
})
/* eslint-disable no-underscore-dangle */
const configureStore = () => createStore(rootReducer,
    composeWithDevTools(),
    /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );
/* eslint-disable no-underscore-dangle */
export default configureStore;