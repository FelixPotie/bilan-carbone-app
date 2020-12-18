import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, UserActionTypes } from "./types";
import axios from 'axios'

export function loginUserSucess(user: any) : UserActionTypes{
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export function loginUserFailure(error:any) : UserActionTypes{
    return {
        type: LOGIN_USER_FAILURE,
        payload: error
    }
}

export function logoutUser() : UserActionTypes{
    return {
        type: LOGOUT_USER
    }
}

export const login = (username: string, password:string) => {
    return(dispatch:any) => {
        axios.post('http://localhost:4000/user/auth', {username: username, password: password})
            .then(response => {
                const user = response.data
                dispatch(loginUserSucess(user))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(loginUserFailure(errorMsg))
            })
    }
}