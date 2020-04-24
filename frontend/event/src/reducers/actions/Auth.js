 import * as actions from './actionTypes'
 
export const tweetFunc = () => {
    getData()
        .then(info => checkIfExists(info))
        .then(info => {
            // create chrome notification

            let options = {
                type: "basic",
                title: info.name,
                message: info.desc,
                iconUrl: "icon.png"
            };

            chrome.notifications.create(info.link, options);

            return info;
        })
        .then(info => saveLink(info.link))
        .catch(err => { console.log(err); callTweet(); });


    function getData() {
        return new Promise((resolve, reject) => {
            $.get('https://twitter.com/home', function (data) {

                console.log('gotten to the data')
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

    function saveLink(link) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('links', function (data) {
                var links = data.links || [];
                links.push(link);
                chrome.storage.local.set({ links }, () => {
                    resolve('done');
                    callTweet();
                });
            })
        });
    }
};

export const callTweet = () => {
    setTimeout(tweetFunc, 2000);
    return{
        type: actions.AUTH_START
    }
};





// export const fetchGotten = (data) => {
//     {console.log('in the data')}
//     return {
//         type: actions.AUTH_START,
//         payload: data
//     }
// }
// export const fetching = () => {
//     return function(dispatch){
//         console.log('beginning to fetch')
//         dispatch(fetchGotten(response))

//         fetch("https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
//                 "x-rapidapi-key": "f57af9a58dmsh40523e0141e59b3p10f99cjsn62392f9553c9"
//             }
//         })
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(err => {
//                 console.log(err);
//             });

//     }
// }





// export const authSuccess = (auth, res) => {
//     return {
//         type: actions.AUTH_SUCCESS,
//         userId: auth,
//         tokenId: res
//     }
// }

// export const authFailed = (error) => {
//     return {
//         type: actions.AUTH_FAILED,
//         error
//     }
// }

// export const logOut = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('userId')

//     return {
//         type: actions.AUTH_LOGOUT
//     }
// }


// export const clearError = () => {

//     return {
//         type: actions.AUTH_CLEAR_ERROR
//     }
// }

// export const initAuth = (email, password, isLogin) => {

//     return dispatch => {
//         dispatch(authStart())

//         let url = fire.auth().signInWithEmailAndPassword(email, password)
//         if (!isLogin) {
//             url = fire.auth().createUserWithEmailAndPassword(email, password)
//         }
//         url.then(res => {
//             dispatch(authSuccessCheck(res.user.uid))
//         })
//             .catch(err => {
//                 dispatch(authFailed(err.message))
//             })
//     }
// }