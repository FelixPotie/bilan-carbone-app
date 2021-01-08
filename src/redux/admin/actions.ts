import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE, LOGOUT_ADMIN, AdminActionTypes, LOAD_ADMIN, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAILURE, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAILURE } from "./types";
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

export function getAdminsSuccess(admins:any) : AdminActionTypes{
    return {
        type: GET_ADMINS_SUCCESS,
        payload: admins
    }
}

export function getAdminsFailure(error:any) : AdminActionTypes{
    return {
        type: GET_ADMINS_FAILURE,
        payload: error
    }
}

export const getAdmins = () => {
    return(dispatch:any) => {
        axios.get('admin/')
            .then(response => {
                const mobilities = response.data
                dispatch(getAdminsSuccess(mobilities))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getAdminsFailure(errorMsg))
            })
    }
}

export function addAdminSuccess() : AdminActionTypes{
    return {
        type: ADD_ADMIN_SUCCESS
    }
}

export function addAdminFailure(error:any) : AdminActionTypes{
    return {
        type: ADD_ADMIN_FAILURE,
        payload: error
    }
}

export const addAdmin = (body: object) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('admin/', body, {headers:headers})
            .then(response => {
                dispatch(addAdminSuccess())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(addAdminFailure(errorMsg))
            })
    }
}

export function deleteAdminSuccess(id:number) : AdminActionTypes{
    return {
        type: DELETE_ADMIN_SUCCESS,
        payload: id
    }
}

export function deleteAdminFailure(error:any) : AdminActionTypes{
    return {
        type: DELETE_ADMIN_FAILURE,
        payload: error
    }
}

export const deleteAdmin = (id: number) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.delete('admin/'+id)
            .then(response => {
                dispatch(deleteAdminSuccess(id))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteAdminFailure(errorMsg))
            })
    }
}