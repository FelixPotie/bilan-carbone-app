export const GET_TRAVEL_REQUEST  = 'GET_TRAVEL_REQUEST'
export const GET_TRAVEL_SUCCESS  = 'GET_TRAVEL_SUCCESS'
export const GET_TRAVEL_FAILURE  = 'GET_TRAVEL_FAILURE'
export const ADD_TRAVEL_SUCCESS  = 'ADD_TRAVEL_SUCCESS'
export const ADD_TRAVEL_FAILURE  = 'ADD_TRAVEL_FAILURE'
export const INIT_TRAVEL = 'INIT_TRAVEL'

interface getTravelRequest {
    type: typeof GET_TRAVEL_REQUEST,
    payload: string
}

interface getTravelSuccess {
    type: typeof GET_TRAVEL_SUCCESS,
    payload: any

}

interface getTravelFailure {
    type: typeof GET_TRAVEL_FAILURE,
    payload: any
}

interface addTravelSuccess {
    type: typeof ADD_TRAVEL_SUCCESS,
}

interface addTravelFailure {
    type: typeof ADD_TRAVEL_FAILURE,
    payload: any
}

interface initTravel {
    type: typeof INIT_TRAVEL
}


export type TravelActionTypes = getTravelRequest | getTravelSuccess | getTravelFailure | addTravelSuccess | addTravelFailure | initTravel