import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, UserActionTypes, LOAD_USER } from "./types";
import axios from 'axios'
import setAuthToken from "../../modules/setAuthToken";
import jwt_decode from "jwt-decode";

export function loginUserSucess(user: any) : UserActionTypes{
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export function loginUserFailure(error:any) : UserActionTypes{
    if(error==="Request failed with status code 401"){
        return {
            type: LOGIN_USER_FAILURE,
            payload: "Identifiant ou mot de passe incorrect"
        }
    }
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

export function loadUser() : UserActionTypes{
    const token = localStorage.getItem('token');
    if(token){
        const decoded: any = jwt_decode(token);
        const exp : number = +decoded.exp
        if((exp-Date.now()/1000)>0){
            setAuthToken(token)
            return {
                type: LOAD_USER,
                payload: decoded
            }
        } else {
            return {
                type: LOGOUT_USER
            }
        }
        
    } else {
        return {
            type: LOGIN_USER_FAILURE,
            payload: 'invalid token'
        }
    }
    

}

export const login = (username: string, password:string) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('http://localhost:4000/user/auth', {username: username, password: password}, {headers:headers})
            .then(response => {
                const user = response.data
                // sessionStorage.setItem('token', JSON.stringify(user.access_token))
                dispatch(loginUserSucess(user))
                dispatch(loadUser())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(loginUserFailure(errorMsg))
            })
    }
}