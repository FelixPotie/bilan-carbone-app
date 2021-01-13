import { GET_MOBILITY_FAILURE, GET_MOBILITY_REQUEST, GET_MOBILITY_SUCCESS, ADD_MOBILITY_SUCCESS, ADD_MOBILITY_FAILURE, DELETE_MOBILITY_SUCCESS, DELETE_MOBILITY_FAILURE, MobilityActionTypes } from "./types"

const initialState = {
    loading: false,
    mobilites: [],
    error: '',
    success: false
}

export function mobilityReducer(state = initialState,action: MobilityActionTypes) {
    switch (action.type){
        case GET_MOBILITY_REQUEST:
            return {
                ...state,
                success: false,
                error: '',
                loading: true
            }
        case GET_MOBILITY_SUCCESS:
            return {
                ...state,
                loading: false,
                mobilites: action.payload,
                success: true,
                error: ''
            }
        case GET_MOBILITY_FAILURE:
            return {
                ...state,
                loading: false,
                mobilites: [],
                error: action.payload
            }
        case ADD_MOBILITY_SUCCESS:
            return {
                ...state,
                success: true,
                error: ''
            }
        case ADD_MOBILITY_FAILURE:
            return {
                ...state,
                mobilites: [],
                error: action.payload
            }
        case DELETE_MOBILITY_SUCCESS:
            return {
                ...state,
                success: true,
                error: '',
                mobilites: state.mobilites.filter((raw: any) => (raw.id !== action.payload))
            }
        case DELETE_MOBILITY_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}