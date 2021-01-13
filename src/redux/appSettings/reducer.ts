import { GET_APP_SETTINGS_FAILURE, GET_APP_SETTINGS_REQUEST, GET_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_SUCCESS, ADD_APP_SETTINGS_FAILURE, DELETE_APP_SETTINGS_SUCCESS, DELETE_APP_SETTINGS_FAILURE, AppSettingsActionTypes } from "./types"


interface AppSettingsReducer {
    loading: boolean,
    appSettings: any,
    error: string,
    success: boolean
}

const initialState : AppSettingsReducer= {
    loading: false,
    appSettings: {},
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
                loading: false,
                error: '',
                appSettings: {
                    department : [...state.appSettings.department, action.payload],
                    allYear: state.appSettings.allYear,
                    mobilityType: state.appSettings.mobilityType
                }
            }
        case ADD_APP_SETTINGS_FAILURE:
            return {
                ...state,
                appSettings: [],
                loading: false,
                error: action.payload
            }
        case DELETE_APP_SETTINGS_SUCCESS:
            return {
                ...state,
                success: true,
                error: '',
                loading: false,
                appSettings: {
                    department : state.appSettings.department.filter((raw: any) => (raw.name !== action.payload)),
                    allYear: state.appSettings.allYear,
                    mobilityType: state.appSettings.mobilityType
                }
                
            }
        case DELETE_APP_SETTINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: 
            return state
    }
}