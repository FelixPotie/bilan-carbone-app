import { GET_MOBILITY_FAILURE, 
    GET_MOBILITY_REQUEST, 
    GET_MOBILITY_SUCCESS, 
    ADD_MOBILITY_SUCCESS, 
    ADD_MOBILITY_FAILURE, 
    DELETE_MOBILITY_SUCCESS, 
    DELETE_MOBILITY_FAILURE, 
    MobilityActionTypes, 
    DELETE_TRAVEL_FAILURE, 
    DELETE_TRAVEL_SUCCESS, 
    GET_MOBILITIES_STATS_SUCCESS, 
    GET_ALL_MOBILITIES_SUCCESS } from "./types"

const mobilites: any[] = []

const initialState = {
    loading: false,
    mobilites: mobilites,
    error: '',
    success: false,
    mobilityId:0,
    mobilitiesStats: mobilites
}

export function mobilityReducer(state = initialState, action: MobilityActionTypes) {
    switch (action.type) {
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
        case GET_ALL_MOBILITIES_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    mobilites: action.payload,
                    success: true,
                    error: ''
                }
        case GET_MOBILITIES_STATS_SUCCESS:
            return{
                ...state,
                loading: false,
                mobilitiesStats: action.payload,
                success: true,
                error:''
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
                mobilityId: action.payload,
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


        case DELETE_TRAVEL_SUCCESS: {
            return {
                ...state,
                success: true,
                error: '',
                mobilites: state.mobilites.map((mobility: any, index: number) => {
                    if (action.payload.mobilityId !== mobility.id) {
                        return mobility
                    }
                    else {
                        let newTravels = mobility.travels.filter((raw: any) => (raw.id !== action.payload.id))
                        let newMobility = mobility
                        newMobility.travels = newTravels
                        return newMobility
                    }
                })
            }
        }
        case DELETE_MOBILITY_FAILURE: case DELETE_TRAVEL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}