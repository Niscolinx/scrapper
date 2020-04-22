import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {wrapStore} from 'webext-redux';
import { alias } from 'webext-redux';
import count from './reducers/count'
import aliases from './reducers/aliases';



const reduxPromiseResponder = (dispatchResult, send) => {
    Promise
        .resolve(dispatchResult.payload.promise) // pull out the promise
        .then((res) => {
            // if success then respond with value
            send({
                error: null,
                value: res
            });
        })
        .catch((err) => {
            // if error then respond with error
            send({
                error: err,
                value: null
            });
        });
};



const rootReducer = {
    count
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(alias(aliases))
))

wrapStore(store, {
    portName: "Munisco",
    dispatchResponder: reduxPromiseResponder
});
