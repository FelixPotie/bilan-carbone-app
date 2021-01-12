import { GET_TRAVEL_FAILURE, GET_TRAVEL_REQUEST, GET_TRAVEL_SUCCESS, ADD_TRAVEL_SUCCESS, ADD_TRAVEL_FAILURE, DELETE_TRAVEL_SUCCESS, DELETE_TRAVEL_FAILURE, TravelActionTypes } from "./types"

const initialState = {
    loading: false,
    mobilites: [],
    error: '',
    success: false
}


export function travelReducer(state = initialState,action: TravelActionTypes) {
    switch (action.type){
        case GET_TRAVEL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_TRAVEL_SUCCESS:
            return {
                ...state,
                loading: false,
                mobilites: action.payload,
                success: true,
                error: ''
            }
        case GET_TRAVEL_FAILURE:
            return {
                ...state,
                loading: false,
                mobilites: [],
                error: action.payload
            }
        case ADD_TRAVEL_SUCCESS:
            return {
                ...state,
                success: true,
                error: ''
            }
        case ADD_TRAVEL_FAILURE:
            return {
                ...state,
                mobilites: [],
                error: action.payload
            }
        case DELETE_TRAVEL_SUCCESS:
            return {
                ...state,
                success: true,
                error: '',
                mobilites: state.mobilites.filter((raw: any) => (raw.id !== action.payload))
            }
        case DELETE_TRAVEL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}
