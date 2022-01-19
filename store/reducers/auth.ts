import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../models/user";
import {profileTabContent} from "../../constants/profile";


type SliceState = {
    isAuth: boolean;
    authInfoLoaded: boolean;
    profile: User | null;
    loginModalActive: boolean,
    uniqueIdForLogin: string;
    modalWithFormActive: boolean;
    modalWithFormData: string;
    selectedTab: number;
}

const initialState: SliceState = {
    isAuth: false,
    authInfoLoaded: false,
    profile: null,
    loginModalActive: false,
    uniqueIdForLogin: "",
    modalWithFormActive: false,
    modalWithFormData: "",
    selectedTab: profileTabContent[0].id
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
        setModalWithFormActive(state, action: PayloadAction<boolean>){
            state.modalWithFormActive = action.payload;
        },
        setModalWithFormData(state, action: PayloadAction<string>){
            state.modalWithFormData = action.payload;
        },
        setSelectedTab(state, action: PayloadAction<number>){
            state.selectedTab = action.payload;
        }
    },
})

export const {
    setAuth,
    setAuthInfoLoaded,
    setProfile,
    setLoginModalActive,
    setUniqueIdForLogin,
    setModalWithFormActive,
    setModalWithFormData,
    setSelectedTab
} = auth.actions;

export default auth.reducer;