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
        .then(info => checkIfExists(info))
        .catch(err => { console.log(err); callTweet(); });

    function getData() {
        return new Promise((resolve, reject) => {
            $.get('https://jsonplaceholder.typicode.com/todos/1', function (data) {

                console.log('gotten to the data', data)
                let tweet = $(data).find('div.tweet').eq(0);
                let link = tweet.attr('data-permalink-path');
                let name = tweet.find('strong.fullname').text();
                let desc = tweet.find('p.tweet-text').text();

                resolve({ name, desc, link });
            });
        });
    }

    function checkIfExists(info) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('links', function (data) {
                var links = data.links || [];
                if (links.indexOf(info.link) === -1) {
                    // it's fine to show the notification
                    resolve(info);
                } else {
                    reject('tweet already shown');
                }
            });
        });
    }

    // function saveLink(link) {
    //     return new Promise((resolve, reject) => {
    //         chrome.storage.local.get('links', function (data) {
    //             var links = data.links || [];
    //             links.push(link);
    //             chrome.storage.local.set({ links }, () => {
    //                 resolve('done');
    //                 callTweet();
    //             });
    //         })
    //     });
    // }
};

let callTweet = () => {
    setTimeout(tweetFunc, 2000);
};
callTweet()

wrapStore(store, {
    portName: "Munisco",
});
