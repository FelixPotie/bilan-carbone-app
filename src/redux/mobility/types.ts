export const GET_MOBILITY_REQUEST  = 'GET_MOBILITY_REQUEST'
export const GET_MOBILITY_SUCCESS  = 'GET_MOBILITY_SUCCESS'
export const GET_MOBILITY_FAILURE  = 'GET_MOBILITY_FAILURE'
export const ADD_MOBILITY_SUCCESS  = 'ADD_MOBILITY_SUCCESS'
export const ADD_MOBILITY_FAILURE  = 'ADD_MOBILITY_FAILURE'
export const DELETE_MOBILITY_SUCCESS  = 'DELETE_MOBILITY_SUCCESS'
export const DELETE_MOBILITY_FAILURE  = 'DELETE_MOBILITY_FAILURE'
export const DELETE_TRAVEL_SUCCESS = 'DELETE_TRAVEL_SUCCESS'
export const DELETE_TRAVEL_FAILURE = 'DELETE_TRAVEL_FAILURE'


interface getMobilityRequest {
    type: typeof GET_MOBILITY_REQUEST,
}

interface getMobilitiesRequest {
    type: typeof GET_MOBILITY_REQUEST
}

interface getMobilitySuccess {
    type: typeof GET_MOBILITY_SUCCESS,
    payload: any

}

interface getMobilityFailure {
    type: typeof GET_MOBILITY_FAILURE,
    payload: any
}

interface addMobilitySuccess {
    type: typeof ADD_MOBILITY_SUCCESS,
    payload: number
}

interface addMobilityFailure {
    type: typeof ADD_MOBILITY_FAILURE,
    payload: any
}

interface deleteMobilitySuccess {
    type: typeof DELETE_MOBILITY_SUCCESS,
    payload: any
}

interface deleteMobilityFailure {
    type: typeof DELETE_MOBILITY_FAILURE,
    payload: any
}

interface deleteTravelSuccess {
    type: typeof DELETE_TRAVEL_SUCCESS,
    payload: any
}

interface deleteTravelFailure {
    type: typeof DELETE_TRAVEL_FAILURE,
    payload: any
}


export type MobilityActionTypes = getMobilityRequest | getMobilitySuccess | getMobilityFailure | addMobilitySuccess | addMobilityFailure | deleteMobilitySuccess | deleteMobilityFailure | getMobilitiesRequest | deleteTravelSuccess | deleteTravelFailure