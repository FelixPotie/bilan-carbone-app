import axios from "axios"
import { ADD_TRAVEL_SUCCESS, ADD_TRAVEL_FAILURE, DELETE_TRAVEL_FAILURE, DELETE_TRAVEL_SUCCESS, GET_TRAVEL_SUCCESS, GET_TRAVEL_FAILURE, GET_TRAVEL_REQUEST } from "./types"

export function getTravelRequest(userId: number) : any{
    return {
        type: GET_TRAVEL_REQUEST,
        payload: userId
    }
}
export function getTravelSuccess(mobilites:any) : any{
    return {
        type: GET_TRAVEL_SUCCESS,
        payload: mobilites
    }
}

export function getTravelFailure(error:any) : any{
    return {
        type: GET_TRAVEL_FAILURE,
        payload: error
    }
}

export const getTravelsByMobility = (mobilityId: number) => {
    return(dispatch:any) => {
        dispatch(getTravelRequest(mobilityId))
        axios.get('travel/mobility/'+mobilityId)
            .then(response => {
                const travels = response.data
                dispatch(getTravelSuccess(travels))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getTravelFailure(errorMsg))
            })
    }
}

export const addTravel = (travel: any) => {
    const body = {
        date: travel.date,
        travelId: 6,
        type: "GO"
    }
    return (dispatch: any) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post('travel/', body, { headers: headers })
            .then(response => {
                addStep(response.data.id, travel.steps)
                dispatch(addTravelSuccess())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(addTravelFailure(errorMsg))
            })
    }
}

export const addStep = (travelId: number, steps: any) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    steps.map((step: any) => {
        let newStep = {
            ...step,
            travelId: travelId
        }
        console.log(newStep)
        axios.post('step/', newStep, { headers: headers })
        .then(response => {
            console.log("success step : ", response)
        })
        .catch(error => {
            console.log("error", error)
        })
    })

}

export const deleteTravel = (id: number) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.delete('travel/'+id)
            .then(response => {
                dispatch(deleteTravelSuccess(id))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteTravelFailure(errorMsg))
            })
    }
}

export function addTravelSuccess(): any {
    return {
        type: ADD_TRAVEL_SUCCESS
    }
}

export function addTravelFailure(error: any): any {
    return {
        type: ADD_TRAVEL_FAILURE,
        payload: error
    }
}

export function deleteTravelSuccess(id:number) : any{
    return {
        type: DELETE_TRAVEL_SUCCESS,
        payload: id
    }
}

export function deleteTravelFailure(error:any) : any{
    return {
        type: DELETE_TRAVEL_FAILURE,
        payload: error
    }
}