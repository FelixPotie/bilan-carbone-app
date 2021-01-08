import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE, LOGOUT_ADMIN, AdminActionTypes, LOAD_ADMIN, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAILURE, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAILURE } from "./types";


const initialState = {
    isLoggedIn: false,
    admin: null,
    token: localStorage.getItem('admintoken'),
    failure: null,
    success: false,
    admins: [],
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
        case GET_ADMINS_SUCCESS:
            return {
                ...state,
                admins: action.payload,
                success: true,
                failure: null
            }
        case GET_ADMINS_FAILURE:
            return {
                ...state,
                admins: [],
                failure: action.payload
            }
        case ADD_ADMIN_SUCCESS:
            return {
                ...state,
                failure: null,
                success: true,
            }
        case ADD_ADMIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                success: false,
            }
        case DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                failure: null,
                success: true,
                admins: state.admins.filter((raw: any) => (raw.id !== action.payload))
            }
        case DELETE_ADMIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                success: false,
                }
        default: 
            return state
    }
}