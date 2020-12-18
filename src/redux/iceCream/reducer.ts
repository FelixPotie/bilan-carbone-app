import { BUY_ICECREAM, IceCreamState, IceCreamActionTypes } from "./types";

const initialState: IceCreamState = {
    numOfIceCream: 20
}

export function iceCreamReducer(
    state = initialState,
    action: IceCreamActionTypes
): IceCreamState {
    switch (action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCream:state.numOfIceCream - 1
            }
        default: 
            return state
    }
}