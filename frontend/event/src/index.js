import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {wrapStore} from 'webext-redux';
import { alias } from 'webext-redux';
import auth from './reducers/auth'
import aliases from './reducers/aliases';
import thunk from 'redux-thunk'


// const middlewares = [
//     alias(aliases),
//     thunk
// ]

const rootReducer = {
    auth
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(alias(aliases), thunk)
))

wrapStore(store, {
    portName: "Munisco",
});
