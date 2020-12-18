import { BUY_CAKE, MobilityActionTypes } from "./types";

export function buyCake(n: number =1) : MobilityActionTypes {
    return {
        type: BUY_CAKE,
        payload: n
    }
}