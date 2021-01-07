import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE, LOGOUT_ADMIN, AdminActionTypes, LOAD_ADMIN } from "./types";
import axios from 'axios'
import setAuthToken from "../../modules/setAuthToken";
import jwt_decode from "jwt-decode";

export function loginAdminSucess(admin: any) : AdminActionTypes{
    return {
        type: LOGIN_ADMIN_SUCCESS,
        payload: admin
    }
}

export function loginAdminFailure(error:any) : AdminActionTypes{
    if(error==="Request failed with status code 401"){
        return {
            type: LOGIN_ADMIN_FAILURE,
            payload: "Identifiant ou mot de passe incorrect"
        }
    }
    return {
        type: LOGIN_ADMIN_FAILURE,
        payload: error
    }
}

export function logoutAdmin() : AdminActionTypes{
    return {
        type: LOGOUT_ADMIN
    }
}

export function loadAdmin() : AdminActionTypes{
    const token = localStorage.getItem('admintoken');
    if(token){
        const decoded: any = jwt_decode(token);
        const exp : number = +decoded.exp
        if((exp-Date.now()/1000)>0){
            setAuthToken(token)
            return {
                type: LOAD_ADMIN,
                payload: decoded
            }
        } else {
            return {
                type: LOGOUT_ADMIN
            }
        }
        
    } else {
        return {
            type: LOGIN_ADMIN_FAILURE,
            payload: 'invalid token'
        }
    }
    

}

export const loginAdmin = (username: string, password:string) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('admin/auth', {username: username, password: password}, {headers:headers})
            .then(response => {
                const user = response.data
                dispatch(loginAdminSucess(user))
                dispatch(loadAdmin())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(loginAdminFailure(errorMsg))
            })
    }
}