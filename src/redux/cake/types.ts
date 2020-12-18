export interface MobilityState {
    numOfCakes: number
}

export const BUY_CAKE = 'BUY_CAKE'

interface BuyCakeAction {
    type: typeof BUY_CAKE,
    payload: number
}

export type MobilityActionTypes = BuyCakeAction