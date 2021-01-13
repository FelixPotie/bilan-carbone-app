import { GET_APP_SETTINGS_FAILURE, GET_APP_SETTINGS_REQUEST, GET_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_FAILURE , DELETE_APP_SETTINGS_SUCCESS, DELETE_APP_SETTINGS_FAILURE, AppSettingsActionTypes } from "./types";
import axios from 'axios'

export function getAppSettingsRequest() : AppSettingsActionTypes{
    return {
        type: GET_APP_SETTINGS_REQUEST,
    }
}

export function getAppSettingsSuccess(appSettings:any) : AppSettingsActionTypes{
    return {
        type: GET_APP_SETTINGS_SUCCESS,
        payload: appSettings
    }
}

export function getAppSettingsFailure(error:any) : AppSettingsActionTypes{
    return {
        type: GET_APP_SETTINGS_FAILURE,
        payload: error
    }
}

export const getAppSettings = () => {
    
    return(dispatch:any) => {
        dispatch(getAppSettingsRequest())
        axios.get('app/setting')
            .then(response => {
                const appSettings = response.data
                dispatch(getAppSettingsSuccess(appSettings))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getAppSettingsFailure(errorMsg))
            })
    }
}

export function addAppSettingsSuccess() : AppSettingsActionTypes{
    return {
        type: ADD_APP_SETTINGS_SUCCESS
    }
}

export function addAppSettingsFailure(error:any) : AppSettingsActionTypes{
    return {
        type: ADD_APP_SETTINGS_FAILURE,
        payload: error
    }
}

export const addAppSettings = (body: object) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('mobility/', body, {headers:headers})
            .then(response => {
                dispatch(addAppSettingsSuccess())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(addAppSettingsFailure(errorMsg))
            })
    }
}

export function deleteAppSettingsSuccess(id:number) : AppSettingsActionTypes{
    return {
        type: DELETE_APP_SETTINGS_SUCCESS,
        payload: id
    }
}

export function deleteAppSettingsFailure(error:any) : AppSettingsActionTypes{
    return {
        type: DELETE_APP_SETTINGS_FAILURE,
        payload: error
    }
}

export const deleteAppSettings = (id: number) => {
    return(dispatch:any) => {
        axios.delete('mobility/'+id)
            .then(response => {
                dispatch(deleteAppSettingsSuccess(id))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteAppSettingsFailure(errorMsg))
            })
    }
}