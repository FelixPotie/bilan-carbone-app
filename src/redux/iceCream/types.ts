export interface IceCreamState {
    [x: string]: any
    numOfIceCream: number
}

export const BUY_ICECREAM = 'BUY_ICECREAM'

interface BuyIceCreamAction {
    type: typeof BUY_ICECREAM
}

export type IceCreamActionTypes = BuyIceCreamAction