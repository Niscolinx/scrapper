import {createStore} from 'redux';
import count from './reducers/count'
import aliases from './reducers/aliases';

const middleware = [
    alias(aliases)
];

/**
 * Respond to action based on `redux-promise-middleware` result
 * @param  {object} dispatchResult The resulting object from `store.dispatch()`
 * @param  {func}   send           func to be called when sending response. Should be in form {value, error}
 */
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


import {wrapStore} from 'webext-redux';

const rootReducer = {
    count
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combineReducers(rootReducer), composeEnhancers(applyMiddleware(middleware)
))

wrapStore(store, {
    portName: "Munisco",
    dispatchResponder: reduxPromiseResponder
});
