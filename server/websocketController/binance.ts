import {WsResponseTypeTrades} from '../types/types'
import WebSocket from "ws";
import {arrOfStreams} from '../types/types'
let streams =arrOfStreams;
let toSend:WsResponseTypeTrades| undefined;

let arrTrades = streams.map((e)=>{
    return e + '@trade'
});

const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${arrTrades.join('/')}`);

export function connectToTrades(callback:(data:WsResponseTypeTrades,)=>any){
          ws.on('message',(e:any)=>{
            
            var uint8array = new TextEncoder().encode(e);
            toSend =JSON.parse(new TextDecoder().decode(uint8array));
            if(toSend?.s !== 'BTCUSDT'){
              callback(toSend as WsResponseTypeTrades)
            }
          });
          setInterval(()=>{
            if(toSend?.s === 'BTCUSDT')
            callback(toSend as WsResponseTypeTrades)
          },100)
        function close(){
          return ws.close();
        }
        return {close,toSend}
    }





