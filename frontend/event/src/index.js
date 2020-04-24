import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {wrapStore} from 'webext-redux';
import { alias } from 'webext-redux';
import auth from './reducers/auth'
import aliases from './reducers/aliases';
import thunk from 'redux-thunk';
import * as actions from '../src/reducers/actions/actionTypes'


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

export const fetchGotten = (data) => {
    { console.log('in the data') }
    return {
        type: actions.AUTH_START,
        payload: data
    }
}
export const fetching = () => {
    return function (dispatch) {
        console.log('beginning to fetch')
        dispatch(fetchGotten(response))

        fetch("https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
                "x-rapidapi-key": "f57af9a58dmsh40523e0141e59b3p10f99cjsn62392f9553c9"
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });

    }
}

wrapStore(store, {
    portName: "Munisco",
});
