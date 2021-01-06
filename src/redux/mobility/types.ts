export const GET_MOBILITY_REQUEST  = 'GET_MOBILITY_REQUEST'
export const GET_MOBILITY_SUCCESS  = 'GET_MOBILITY_SUCCESS'
export const GET_MOBILITY_FAILURE  = 'GET_MOBILITY_FAILURE'
export const ADD_MOBILITY_SUCCESS  = 'ADD_MOBILITY_SUCCESS'
export const ADD_MOBILITY_FAILURE  = 'ADD_MOBILITY_FAILURE'

interface getMobilityRequest {
    type: typeof GET_MOBILITY_REQUEST,
    payload: string
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
}

interface addMobilityFailure {
    type: typeof ADD_MOBILITY_FAILURE,
    payload: any
}

export type MobilityActionTypes = getMobilityRequest | getMobilitySuccess | getMobilityFailure | addMobilitySuccess | addMobilityFailure