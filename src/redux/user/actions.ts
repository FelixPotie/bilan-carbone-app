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
    console.log(username);
    console.log(password);
    return(dispatch:any) => {
        var headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('http://localhost:4000/user/auth', {username: username, password: password}, {headers:headers})
            .then(response => {
                const user = response.data
                sessionStorage.setItem('token', JSON.stringify(user.access_token))
                dispatch(loginUserSucess(user))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(loginUserFailure(errorMsg))
            })
    }
}