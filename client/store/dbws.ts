import {createSlice} from '@reduxjs/toolkit';
import { Tcoins, Transactions } from '../types';


type initial = {
    isconnected:boolean,
    connecting:boolean,
    error:boolean | object,
    wallet:Tcoins<number>,
    orders:Transactions[],
    history:Array<any> //// than change it 
}

export const dbDataWs = createSlice({
    name:'dbData',
    initialState:{
        isconnected:false,
        connecting:false,
        error:false,
        orders:[],
        wallet:{
            ada:0,
            bnb:0,
            btc:0,
            dot:0,
            eth:0,
            ltc:0,
            matic:0,
            shib:0,
            sol:0,
            uni:0,
            usdt:0,
            xrp:0
        },
        history:[]
    } as initial,
    reducers:{
        startConnToDataWs(state){
            state.connecting = true;
        },
        isconnected(state){
            state.connecting = false;
            state.isconnected = true;
        },
        getWalletData(state,{payload}){
            state.wallet = payload
        },//orders
        setOrders(state,{payload}){
            state.orders = payload;
        },
        error(state,{payload}){
            state.connecting = false;
            state.isconnected= false;
            state.error= payload;
        },
        buyCoin(state,{payload}){
            //just sending data with websocket
            //wallet state is updated by getWalletData
        },
        sellCoin(state,{payload}){/*same*/},

    } 
})

export const {isconnected,error,startConnToDataWs,getWalletData,setOrders,buyCoin,sellCoin} = dbDataWs.actions

