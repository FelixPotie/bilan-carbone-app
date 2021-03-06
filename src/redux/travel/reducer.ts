import { ADD_TRAVEL_SUCCESS, ADD_TRAVEL_FAILURE, INIT_TRAVEL, UPDATE_TRAVEL_SUCCESS, UPDATE_TRAVEL_FAILURE, TravelActionTypes } from "./types"

const initialState = {
    loading: false,
    error: '',
    success: false
}


export function travelReducer(state = initialState,action: TravelActionTypes) {
    switch (action.type){
        case INIT_TRAVEL:
            return {
                loading: false,
                error: '',
                success: false
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
                error: action.payload
            }
        case UPDATE_TRAVEL_SUCCESS:
            return {
                ...state,
                success: true,
                error: ''
            }
        case UPDATE_TRAVEL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}
