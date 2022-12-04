import io from "socket.io-client";
import {AppDispatch, AppStore } from ".";
import { arrOfStreams, Transactions } from "../types";
import { startConnecting,connected,getMessage,onError } from "./binanceStream";
import {changeMarket} from './market'
import { error, getWalletData,setOrders,sellCoin,buyCoin} from "./dbws";


export const  wssMiddleware:any = (store:AppStore)=>{
    
    const socket = io("http://localhost:5000/trades", 
    {
        path: "/streamBinance",
        transports: ["websocket"],
        query: 
        {
        stream:store.getState().market.market
        }
    });
    const socket_personalData = io("http://localhost:5000/personalData", {
                path: "/streamBinance",
                transports: ["websocket"],
    });

    return (next:AppDispatch)=>(action:any)=>
    {
        if(startConnecting.match(action))
        {
            
            socket.on('connect',()=>
            {
                console.log('this shit is connected')
                store.dispatch(connected())
            });
   
            socket.on('data',(e)=>
            {
                store.dispatch(getMessage(e))
            });
            socket.on('connect_error',(e)=>
            {
                store.dispatch(onError(e))
            });
            socket.on('connect_failed',(e)=>
            {
                store.dispatch(onError(e))
            });
            socket.on('disconnect',(e)=>{
                store.dispatch(onError(e))
            });
          
        }
        if(changeMarket.match(action)){
            if(arrOfStreams.includes(action.payload)){
                
                socket.emit('change_market',action.payload)
            }else{
                console.error('incorrect_stream::middleware error')
            }
        }


        // private data
        if(startConnecting.match(action)){
                socket_personalData.on('data', (e)=>{
                    let response =  JSON.parse(e); 
                    let walletData = response.wallet;
                        delete walletData.id;
                        delete walletData.user_id;
                        store.dispatch(getWalletData(walletData));
                    let transactions:Transactions[] = response.transactions
                        store.dispatch(setOrders(transactions));
                    let history = response.history;
                })
                socket_personalData.on('connect_error',(e)=>error(e));    
        }
        if(sellCoin.match(action)){
            socket_personalData.emit('sell',action.payload);
        }
        if(buyCoin.match(action)){
            socket_personalData.emit('buy',action.payload);
        } 
        

       return next(action);
    }
}
