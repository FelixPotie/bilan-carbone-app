import {LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, UserActionTypes} from "./types";

const initialState = {
    isLoggedIn: false,
    users: null,
}

export function userReducer(state = initialState,action: UserActionTypes) {
    switch (action.type){
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        case LOGOUT_USER:
            return {
                isLoggedIn: false,
                user: null,
            }
        default: 
            return state
    }
}