import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE, LOGOUT_ADMIN, AdminActionTypes, LOAD_ADMIN } from "./types";


const initialState = {
    isLoggedIn: false,
    admin: null,
    token: localStorage.getItem('admintoken'),
    failure: null
}

export function adminReducer(state = initialState,action: AdminActionTypes) {
    switch (action.type){
        case LOGIN_ADMIN_SUCCESS:
            localStorage.setItem('admintoken', action.payload.access_token);
            return {
                ...state,
                failure: null,
                token: action.payload.access_token,
            }
        case LOAD_ADMIN:
            return {
                ...state,
                isLoggedIn: true,
                admin: action.payload,
                failure: null
            }
        case LOGIN_ADMIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                admin: null,
                failure: action.payload
            }
        case LOGOUT_ADMIN:
            localStorage.removeItem('admintoken');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                admin: null
            }
        default: 
            return state
    }
}