import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'webext-redux';

const store = createStore(rootReducer, {});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(thunk)
))

wrapStore(store, {
    portName = "Munisco"
});
