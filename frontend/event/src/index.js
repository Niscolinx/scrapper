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

let tweet = []
let tweetFunc = () => {
    let tweetData;
    getData()
        .then(info => {console.log('this has been received', info)})
        .catch(err => { console.log(err); callTweet(); });

    function getData() {
        return new Promise((resolve, reject) => {
            $.get('https://jsonplaceholder.typicode.com/todos/1', function (data) {

                tweetData = data
                tweet.push(data)
                console.log('gotten to the data', tweetData)
            });
        });
    }
    console.log('gotten to the tweet data 1', tweetData)
    return tweetData
};

async function callTweet(){
    console.log('calling');
    const result = await tweetFunc();
    console.log('This is the data inside tweet', tweet)
    console.log(result);
};
callTweet()

wrapStore(store, {
    portName: "Munisco",
});
