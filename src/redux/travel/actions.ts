import axios from "axios"
import { ADD_TRAVEL_SUCCESS, ADD_TRAVEL_FAILURE, DELETE_TRAVEL_FAILURE, DELETE_TRAVEL_SUCCESS, TravelActionTypes} from "./types"


export const addTravel = (travel: any) => {
    const body = {
        date: travel.date,
        mobilityId: 6,
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

export const deleteTravel = (id: number, mobilityId: number) => {
    return(dispatch:any) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        axios.delete('travel/'+id)
            .then(response => {
                console.log("ok")
                dispatch(deleteTravelSuccess(id, mobilityId))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(deleteTravelFailure(errorMsg))
            })
    }
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

export function deleteTravelSuccess(id:number, mobilityId: number) : TravelActionTypes{
    return {
        type: DELETE_TRAVEL_SUCCESS,
        payload: {id: id, mobilityId: mobilityId}
    }
}

export function deleteTravelFailure(error:any) : TravelActionTypes{
    return {
        type: DELETE_TRAVEL_FAILURE,
        payload: error
    }
}