import { BUY_ICECREAM, IceCreamActionTypes } from "./types";

export function buyIceCream() : IceCreamActionTypes {
    return {
        type: BUY_ICECREAM
    }
}