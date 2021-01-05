import { GET_MOBILITY_FAILURE, GET_MOBILITY_REQUEST, GET_MOBILITY_SUCCESS, MobilityActionTypes } from "./types"

const initialState = {
    loading: false,
    mobilites: [],
    error: ''
}

export function mobilityReducer(state = initialState,action: MobilityActionTypes) {
    switch (action.type){
        case GET_MOBILITY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_MOBILITY_SUCCESS:
            return {
                loading: false,
                mobilites: action.payload,
                error: ''
            }
        case GET_MOBILITY_FAILURE:
            return {
                loading: false,
                mobilites: [],
                error: action.payload
            }
        default: 
            return state
    }
}