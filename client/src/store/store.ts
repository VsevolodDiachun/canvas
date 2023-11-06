import {combineReducers, configureStore} from "@reduxjs/toolkit";
import toolReducer from './reducers/ToolSlice';
import canvasReducer from './reducers/CanvasSlice';

const rootReducer = combineReducers({
    toolReducer,
    canvasReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']