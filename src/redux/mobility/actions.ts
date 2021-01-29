import { GET_MOBILITY_FAILURE, 
    GET_MOBILITY_REQUEST, 
    GET_MOBILITY_SUCCESS, 
    ADD_MOBILITY_SUCCESS, 
    GET_MOBILITIES_STATS_SUCCESS, 
    ADD_MOBILITY_FAILURE , 
    DELETE_MOBILITY_SUCCESS, 
    DELETE_MOBILITY_FAILURE, 
    MobilityActionTypes, 
    DELETE_TRAVEL_SUCCESS, 
    DELETE_TRAVEL_FAILURE, 
    GET_ALL_MOBILITIES_SUCCESS } from "./types";
import axios from 'axios'

export function getMobilityRequest() : MobilityActionTypes{
    return {
        type: GET_MOBILITY_REQUEST,
    }
}

export function getMobilitiesRequest() : MobilityActionTypes{
    return {
        type: GET_MOBILITY_REQUEST,
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
        dispatch(getMobilityRequest())
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

export function getMobilitiesFoStatsSuccess(mobilites:any) : MobilityActionTypes{
    return {
        type: GET_MOBILITIES_STATS_SUCCESS,
        payload: mobilites
    }
}

export function getAllMobilitiesSuccess(mobilites:any) : MobilityActionTypes{
    return {
        type: GET_ALL_MOBILITIES_SUCCESS,
        payload: mobilites
    }
}

export const getAllMobilities = () => {
    return(dispatch:any) => {
        dispatch(getMobilitiesRequest())
        axios.get('mobility/').then(response => {
            const mobilities = response.data
            dispatch(getAllMobilitiesSuccess(mobilities))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(getMobilityFailure(errorMsg))
        })
    }
}

export const getMobilitiesForStats = () => {
    return(dispatch:any) => {
        dispatch(getMobilitiesRequest())
        axios.get('mobility/').then(response => {
            const mobilities = response.data.map((mobility:any)=> 
                ({
                    departmentTypeName:mobility.departmentTypeName,
                    type:mobility.type,
                    year:mobility.year,
                    startDate:mobility.startDate,
                    endDate:mobility.endDate,
                    travels:mobility.travels,
                    departmentType:mobility.departmentType
                })
            )
            dispatch(getMobilitiesFoStatsSuccess(mobilities))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(getMobilityFailure(errorMsg))
        })
    }
}

export const getMobilitiesWithFilter = (body: object) => {
    return(dispatch:any) => {
        dispatch(getMobilityRequest())
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.post('mobility/export', body, {headers:headers})
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

export function addMobilitySuccess(id: number) : MobilityActionTypes{
    return {
        type: ADD_MOBILITY_SUCCESS,
        payload: id
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
                console.log('1212');
                console.log(response);
                console.log('1212');
                dispatch(addMobilitySuccess(response.data.id));
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

export const deleteTravel = (id: number, mobilityId: number) => {
    return(dispatch:any) => {
        axios.delete('travel/'+id)
            .then(response => {
                dispatch(deleteTravelSuccess(id, mobilityId))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteTravelFailure(errorMsg))
            })
    }
}

export function deleteTravelSuccess(id:number, mobilityId: number) : MobilityActionTypes{
    return {
        type: DELETE_TRAVEL_SUCCESS,
        payload: {id: id, mobilityId: mobilityId}
    }
}

export function deleteTravelFailure(error:any) : MobilityActionTypes{
    return {
        type: DELETE_TRAVEL_FAILURE,
        payload: error
    }
}