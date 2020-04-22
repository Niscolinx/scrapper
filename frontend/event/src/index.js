import {createStore} from 'redux';
import rootReducer from './reducers/aliases';
import count from './reducers/count'
import aliases from '../aliases';

const middleware = [
    alias(aliases),  // this should always be the first middleware
    // whatever middleware you want (like redux-thunk)
];



import {wrapStore} from 'webext-redux';

const rootReducer = {
    count
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(middleware)
))

wrapStore(store, {
    portName = "Munisco"
});
