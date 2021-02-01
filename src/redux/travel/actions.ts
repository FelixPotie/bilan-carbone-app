import axios from "axios"
import { ADD_TRAVEL_SUCCESS, ADD_TRAVEL_FAILURE, INIT_TRAVEL, UPDATE_TRAVEL_SUCCESS, UPDATE_TRAVEL_FAILURE, TravelActionTypes} from "./types"


export const addTravel = (travel: any) => {
    const body = {
        date: travel.date,
        mobilityId: Number(travel.mobilityId),
        type: travel.type
    }
    console.log("travel: ", travel, "body : ", body)
    return (dispatch: any) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.post('travel/', body, { headers: headers })
            .then(async response => {
                await addStep(response.data.id, travel.steps)
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
    return new Promise(resolve => {
        steps.forEach((step: any, index:number) => {
            let newStep = {
                ...step,
                travelId: travelId
            }
            if(step.distance !== 0)
            axios.post('step/', newStep, { headers: headers })
            .then(response => {
                console.log("success step : ", response);
            })
            .catch(error => {
                console.log("error", error);
            })
            if(index===steps.length -1) resolve(true);
        })
    })
}


export function addTravelSuccess(): TravelActionTypes {
    return {
        type: ADD_TRAVEL_SUCCESS
    }
}

export function addTravelFailure(error: any): TravelActionTypes {
    return {
        type: ADD_TRAVEL_FAILURE,
        payload: error
    }
}

export function initTravel(): TravelActionTypes {
    return {
        type: INIT_TRAVEL,
    }
}

export const updateTravel = (travel: any) => {
    const body = {
        date: travel.date,
        mobilityId: Number(travel.mobilityId),
        type: travel.type
    }
    
    console.log("travel: ", travel, "body : ", body)
    return (dispatch: any) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        axios.put('travel/'+travel.travelId, body, { headers: headers })
            .then(async response => {
                await deleteSteps(travel.travel)
                await addStep(Number(travel.travelId), travel.steps)
                dispatch(updateTravelSuccess())
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(updateTravelFailure(errorMsg))
            })
    }
}

export const deleteSteps = (travel: any) => {
    return new Promise(resolve => {
        travel.steps.forEach((step: any, index:number) => {
            axios.delete('step/'+step.id)
            .then(response => {
                console.log("success step : ", response);
            })
            .catch(error => {
                console.log("error", error);
            })
            if(index===travel.steps.length -1) resolve(true);
        })
        if(travel.steps.length===0) resolve(true);
    })
}

export function updateTravelSuccess(): TravelActionTypes {
    return {
        type: UPDATE_TRAVEL_SUCCESS
    }
}

export function updateTravelFailure(error: any): TravelActionTypes {
    return {
        type: UPDATE_TRAVEL_FAILURE,
        payload: error
    }
}