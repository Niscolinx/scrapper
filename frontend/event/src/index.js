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



let tweetFunc = () => {
    getData()
        .then(info => {console.log('this has been received', info)})
        .catch(err => { console.log(err); callTweet(); });

    function getData() {
        return new Promise((resolve, reject) => {
            $.get('https://jsonplaceholder.typicode.com/todos/1', function (data) {

                console.log('gotten to the data', data)
            });
        });
    }

};

let callTweet = () => {
    setTimeout(tweetFunc, 2000);
};
callTweet()

wrapStore(store, {
    portName: "Munisco",
});
