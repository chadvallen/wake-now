const INITIAL_STATE = {
    user: null,
    loggedIn: false
};

const USER_LOGIN = 'USER_LOGIN';
const UPDATE_LOGGED_IN = 'UPDATE_LOGGED_IN';

export function userLogin(user) {
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function isLoggedIn(loggedIn) {
    return {
        type: UPDATE_LOGGED_IN,
        payload: loggedIn
    }
}


function reducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {...state, user: action.payload};
        case UPDATE_LOGGED_IN:
            return {...state, loggedIn: action.payload};
        default:
            return state;
    }
}

export default reducer;