export const GET_APP_SETTINGS_REQUEST  = 'GET_APP_SETTINGS_REQUEST'
export const GET_APP_SETTINGS_SUCCESS  = 'GET_APP_SETTINGS_SUCCESS'
export const GET_APP_SETTINGS_FAILURE  = 'GET_APP_SETTINGS_FAILURE'
export const ADD_APP_SETTINGS_SUCCESS  = 'ADD_APP_SETTINGS_SUCCESS'
export const ADD_APP_SETTINGS_FAILURE  = 'ADD_APP_SETTINGS_FAILURE'
export const DELETE_APP_SETTINGS_SUCCESS  = 'DELETE_APP_SETTINGS_SUCCESS'
export const DELETE_APP_SETTINGS_FAILURE  = 'DELETE_APP_SETTINGS_FAILURE'


interface getAppSettingsRequest {
    type: typeof GET_APP_SETTINGS_REQUEST,
}

interface getAppSettingsSuccess {
    type: typeof GET_APP_SETTINGS_SUCCESS,
    payload: any

}

interface getAppSettingsFailure {
    type: typeof GET_APP_SETTINGS_FAILURE,
    payload: any
}

interface addAppSettingsSuccess {
    type: typeof ADD_APP_SETTINGS_SUCCESS,
    payload: any
}

interface addAppSettingsFailure {
    type: typeof ADD_APP_SETTINGS_FAILURE,
    payload: any
}

interface deleteAppSettingsSuccess {
    type: typeof DELETE_APP_SETTINGS_SUCCESS,
    payload: any
}

interface deleteAppSettingsFailure {
    type: typeof DELETE_APP_SETTINGS_FAILURE,
    payload: any
}

export type AppSettingsActionTypes = getAppSettingsRequest | getAppSettingsSuccess | getAppSettingsFailure | addAppSettingsSuccess | addAppSettingsFailure | deleteAppSettingsSuccess | deleteAppSettingsFailure