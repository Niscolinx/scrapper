import * as actions from './actionTypes'
import fire from '../../../../firebase/firebase'

console.log('beginning')
export const fetch = () => {
    return dispatch => {

        fetch("https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
                "x-rapidapi-key": "f57af9a58dmsh40523e0141e59b3p10f99cjsn62392f9553c9"
            }
        })
            .then(response => {
                console.log(response);
                dispatch(fetchGotten(response))
            })
            .catch(err => {
                console.log(err);
            });

        type: actions.AUTH_START
    }
}

export const fetchGotten = (data) =>{
    return{
        type: actions.AUTH_START,
        payload: data
    }
}
console.log('ending')

export const authSuccessCheck = (auth) => {    
    return dispatch => {

        console.log('gotten to redux')
        let user = fire.auth().currentUser;
        let token = user.getIdToken()
        token.then((res) => {
             localStorage.setItem('userId', auth)
             localStorage.setItem('token', res)
               dispatch(authSuccess(auth, res))

               setTimeout(() => {
                   dispatch(logOut())
               }, 3600 * 1000);
            })
            .catch((err) => {
                dispatch(authFailed(err))
            })
   }
}

export const authSuccess = (auth,res) => {
    return {
        type: actions.AUTH_SUCCESS,
        userId: auth,
        tokenId: res
    }
}

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    return {
        type: actions.AUTH_LOGOUT
    }
}


export const clearError = () => {

    return{
        type: actions.AUTH_CLEAR_ERROR
    }
}

export const initAuth = (email, password, isLogin) => {

    return dispatch => {
        dispatch(authStart())

        let url = fire.auth().signInWithEmailAndPassword(email, password)
        if (!isLogin) {
            url = fire.auth().createUserWithEmailAndPassword(email, password)
        }
        url.then(res => {
            dispatch(authSuccessCheck(res.user.uid))
        })
        .catch(err => {
            dispatch(authFailed(err.message))
        })
    }
}