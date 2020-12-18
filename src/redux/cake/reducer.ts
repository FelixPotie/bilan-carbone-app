import { BUY_CAKE, MobilityActionTypes, MobilityState } from "./types";

const initialState: MobilityState = {
    numOfCakes: 10
}

export function cakeReducer(
    state = initialState,
    action: MobilityActionTypes
): MobilityState {
    switch (action.type){
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes:state.numOfCakes - action.payload
            }
        default: 
            return state
    }
}