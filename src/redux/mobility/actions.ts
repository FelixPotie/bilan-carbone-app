import { GET_MOBILITY_FAILURE, GET_MOBILITY_REQUEST, GET_MOBILITY_SUCCESS, ADD_MOBILITY_SUCCESS, ADD_MOBILITY_FAILURE , DELETE_MOBILITY_SUCCESS, DELETE_MOBILITY_FAILURE, MobilityActionTypes } from "./types";
import axios from 'axios'
import { createNoSubstitutionTemplateLiteral } from "typescript";

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

export const getMobilitiesByUser = (username: string) => {
    return(dispatch:any) => {
        dispatch(getMobilityRequest(username))
        axios.get('mobility/user/'+username)
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

export function addMobilitySuccess() : MobilityActionTypes{
    return {
        type: ADD_MOBILITY_SUCCESS
    }
}

export function addMobilityFailure(error:any) : MobilityActionTypes{
    return {
        type: ADD_MOBILITY_FAILURE,
        payload: error
    }
}

export const addMobility = (body: object) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('mobility/', body, {headers:headers})
            .then(response => {
                dispatch(addMobilitySuccess())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(addMobilityFailure(errorMsg))
            })
    }
}

export function deleteMobilitySuccess(id:number) : MobilityActionTypes{
    return {
        type: DELETE_MOBILITY_SUCCESS,
        payload: id
    }
}

export function deleteMobilityFailure(error:any) : MobilityActionTypes{
    return {
        type: DELETE_MOBILITY_FAILURE,
        payload: error
    }
}

export const deleteMobility = (id: number) => {
    console.log("id: ",id)
    return(dispatch:any) => {
        axios.delete('mobility/'+id)
            .then(response => {
                dispatch(deleteMobilitySuccess(id))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteMobilityFailure(errorMsg))
            })
    }
}