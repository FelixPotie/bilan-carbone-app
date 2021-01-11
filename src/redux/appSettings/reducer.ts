import { GET_APP_SETTINGS_FAILURE, GET_APP_SETTINGS_REQUEST, GET_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_FAILURE, DELETE_APP_SETTINGS_SUCCESS, DELETE_APP_SETTINGS_FAILURE, AppSettingsActionTypes } from "./types"

const initialState = {
    loading: false,
    appSettings: [],
    error: '',
    success: false
}

export function appSettingsReducer(state = initialState,action: AppSettingsActionTypes) {
    switch (action.type){
        case GET_APP_SETTINGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                appSettings: action.payload,
                success: true,
                error: ''
            }
        case GET_APP_SETTINGS_FAILURE:
            return {
                ...state,
                loading: false,
                appSettings: [],
                error: action.payload
            }
        case ADD_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                success: true,
                error: ''
            }
        case ADD_APP_SETTINGS_FAILURE:
            return {
                ...state,
                appSettings: [],
                error: action.payload
            }
        case DELETE_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                success: true,
                error: '',
                appSettings: state.appSettings.filter((raw: any) => (raw.id !== action.payload))
            }
        case DELETE_APP_SETTINGS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}