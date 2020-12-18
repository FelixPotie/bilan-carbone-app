import { GET_MOBILITY_FAILURE, GET_MOBILITY_REQUEST, GET_MOBILITY_SUCCESS, MobilityActionTypes } from "./types";
import axios from 'axios'

export function getMobilityRequest(userId: string) : MobilityActionTypes{
    return {
        type: GET_MOBILITY_REQUEST,
        payload: userId
    }
}

export function getMobilitySuccess(mobilites:any) : MobilityActionTypes{
    return {
        type: GET_MOBILITY_SUCCESS,
        payload: mobilites
    }
}

export function getMobilityFailure(error:any) : MobilityActionTypes{
    return {
        type: GET_MOBILITY_FAILURE,
        payload: error
    }
}

export const getMobilitiesByUser = (userId: string) => {
    return(dispatch:any) => {
        dispatch(getMobilityRequest(userId))
        axios.get('http://localhost:4000/mobility/user/felix.potie')
            .then(response => {
                const mobilities = response.data
                dispatch(getMobilitySuccess(mobilities))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getMobilityFailure(errorMsg))
            })
    }
}