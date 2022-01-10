import {createSlice, PayloadAction} from '@reduxjs/toolkit';


type SliceState = {
    isLoading: boolean;
    isDarkMode: boolean;
}

const initialState: SliceState = {
    isLoading: false,
    isDarkMode: false
}

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setIsDarkMode(state, action: PayloadAction<boolean>){
            state.isDarkMode = action.payload;
        }
    },
})

export const {
    setLoading,
    setIsDarkMode
} = main.actions

export default main.reducer;