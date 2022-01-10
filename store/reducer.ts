import {combineReducers, configureStore} from '@reduxjs/toolkit'
import main from "./reducers/main";

const rootReducer = combineReducers({
    main,
});


export const setupStore = () => configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
