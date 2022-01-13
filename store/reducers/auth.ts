import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../models/user";


type SliceState = {
    isAuth: boolean;
    authInfoLoaded: boolean;
    profile: User | null;
    loginModalActive: boolean,
    uniqueIdForLogin: string;
}

const initialState: SliceState = {
    isAuth: false,
    authInfoLoaded: false,
    profile: null,
    loginModalActive: false,
    uniqueIdForLogin: "",
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload;
        },
        setAuthInfoLoaded(state, action: PayloadAction<boolean>){
            state.authInfoLoaded = action.payload;
        },
        setProfile(state, action: PayloadAction<User | null>){
            state.profile = action.payload;
        },
        setLoginModalActive(state, action: PayloadAction<boolean>){
            state.loginModalActive = action.payload;
        },
        setUniqueIdForLogin(state, action: PayloadAction<string>){
            state.uniqueIdForLogin = action.payload;
        },
    },
})

export const {
    setAuth,
    setAuthInfoLoaded,
    setProfile,
    setLoginModalActive,
    setUniqueIdForLogin
} = auth.actions

export default auth.reducer;