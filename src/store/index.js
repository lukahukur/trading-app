import {configureStore} from "@reduxjs/toolkit";
import {binanceApi} from "./dataQuery";
import dataSliceReducer from '../store/dataSlice'
import symbolSliceReducer from "../store/symbolSlice";
import { startConnecting,connectionEstablished, messageIsreceived,stream400ms} from "../store/dataSlice";

/*
I made my own middleware for websocket

*/ 
const wssMiddleware = (store)=>{
    let socket;
    let tmp = ''
      
    
    return (next)=>(action)=>{
        const isConnectionEstablished  = socket && store.getState().data.isConnected;
       
        if(startConnecting.match(action)){
          
            const socket = 
            new WebSocket(`wss://stream.binance.com:9443/ws/${store.getState().symbol.symbol}@trade`);

            socket.addEventListener('open',()=>{
                store.dispatch(connectionEstablished())
            })
   
            socket.addEventListener('message',(e)=>{
                store.dispatch(messageIsreceived())
                const message =JSON.parse(e.data)
                tmp = message
            
        
            })
            setInterval(()=>{
                store.dispatch(stream400ms(tmp))
            },400)
        }
       return next(action);
    }
}



export const store = configureStore({
    reducer:{
        [binanceApi.reducerPath]:binanceApi.reducer,
        data:dataSliceReducer,
        symbol:symbolSliceReducer
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
}).prepend(binanceApi.middleware,wssMiddleware)

})