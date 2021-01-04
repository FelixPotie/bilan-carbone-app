import {LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, UserActionTypes} from "./types";

const initialState = {
    isLoggedIn: false,
    user: null,
    success: false,
    failure: null
}

export function userReducer(state = initialState,action: UserActionTypes) {
    switch (action.type){
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                success: true
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                failure: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default: 
            return state
    }
}