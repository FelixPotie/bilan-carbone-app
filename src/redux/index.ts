import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./user/reducer";
import { mobilityReducer } from "./mobility/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    mobility: mobilityReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger,thunk)))
export type RootState = ReturnType<typeof rootReducer>