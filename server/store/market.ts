import {createSlice} from '@reduxjs/toolkit';
import { BinanceStreams } from '../types/types';

const initialState = {
    market:'btcusdt' as BinanceStreams
}

export const marketSlice = createSlice({
    name:'market',
    initialState:initialState,
    reducers:{
        changeMarket(store,{payload}){
            store.market = payload;
        }
    }
})
export const {changeMarket} = marketSlice.actions;
export default marketSlice.reducer;