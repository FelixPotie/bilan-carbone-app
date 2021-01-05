import {LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, UserActionTypes, LOAD_USER} from "./types";

const initialState = {
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem('token'),
    failure: null
}

export function userReducer(state = initialState,action: UserActionTypes) {
    switch (action.type){
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', action.payload.access_token);
            return {
                ...state,
                failure: null,
                token: action.payload.access_token,
            }
        case LOAD_USER:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                failure: null
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                failure: action.payload
            }
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            }
        default: 
            return state
    }
}