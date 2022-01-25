import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Card} from "../../models/card";


type SliceState = {
    cardsLoaded: boolean;
    cards: null | Card[];
    cardsError: null | string;
}

const initialState: SliceState = {
    cardsLoaded: false,
    cards: null,
    cardsError: null,
}

const card = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardsLoaded(state, action: PayloadAction<boolean>){
            state.cardsLoaded = action.payload;
        },
        setCards(state, action: PayloadAction<null | Card[]>){
            state.cards = action.payload;
        },
        setCardsError(state, action: PayloadAction<null | string>){
            state.cardsError = action.payload;
        },
    },
})

export const {
    setCards,
    setCardsError,
    setCardsLoaded,
} = card.actions

export default card.reducer;