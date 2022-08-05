import { createSlice } from "@reduxjs/toolkit";
const coins = [
    {
    coin:'btc',
    id:1
    },
    {
    coin:'eth',
    id:2
    },
    {
     coin: 'shib',
     id:3
    },
    {
    coin:'xrp', 
    id:4
    },
    {
    coin:'doge',
    id:5
    },
    {
    coin:'bnb',
     id:6
    },
    {
    coin:'trx',
    id:7
    },
    {
    coin:'etc',
    id:8
    },
    {
    coin:'fil',
    id:9
    },
    {
    coin:'luna',
    id:10
    },
];

const initialState = {
    symbol:'btcusdt',
    time:'1m',
    coins:coins
    
}
const symbolSlice = createSlice({
    name:'symbol',
    initialState,
    reducers:{
        changeSymbol:((state,{payload})=>{
            state.symbol = payload
       
        }),
        changeTime:((state,{payload})=>{
            state.time = payload
        }),
    }
})
export const {changeSymbol,changeTime}  = symbolSlice.actions
export default symbolSlice.reducer