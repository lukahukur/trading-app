import jwt from 'jsonwebtoken'
import {Server ,}from 'socket.io'
import { httpServer } from "..";
import {arrOfStreams, BinanceStreams, WsResponseTypeTrades} from '../types/types'
import { connectToTrades } from "./binance";
import dotenv from 'dotenv'
import {getState,dispatch,subscribe} from '../store/index';
import { changeMarket } from '../store/market';
import db from '../db';
import { setTransactions } from '../store/transactions';



declare module 'jsonwebtoken'{
    interface JwtPayload{
        email:string
    }

}

export class WsController
{
    static Ws400ms()
    {
        const io = new Server(httpServer,{
            path:'/streamBinance',
            transports: ['websocket'],
            cors:{
                origin:'http://localhost:3000',
            }
          }); 
          
        io.of('/trades').on('connection',(socket)=>
        {    
                let prevValue:WsResponseTypeTrades | undefined;
                const callback = (data:WsResponseTypeTrades)=>
                {   
                    let stream = getState().market.market
                    if(data && data.s === stream.toUpperCase() && prevValue?.t !== data.t)
                    {
                        socket.emit('data',data);
                        prevValue = data; 
                    }      
                }
             connectToTrades(callback)

                socket.on('change_market',(arg)=>{
                    if(arrOfStreams.includes(arg)){
                        dispatch(changeMarket(arg))
                    }
                });
        });
        
        io.of('/personalData').use((socket,next)=>{
            let arr  = socket.request.headers.cookie?.split(';')
            if(!arr){return next( new Error('no tokens'))}
            const accessToken =arr[0].slice(7);
            let secret =process.env.ACC as string;
            jwt.verify(accessToken,secret,(error,verifiedJwtObj)=>{
                if(!error && verifiedJwtObj){
                    socket.email= (verifiedJwtObj as JwtPayload).email
                   next();
                }else{
                    next(new Error('Authentication error'))
                }
            })
        })
        .on('connection',async (socket)=>{

                let verifiedEmail = socket.email;

                let wallet = await db.query('select wallet.* from wallet join user_table on user_table.id = wallet.user_id where email=$1',[verifiedEmail]);
                let transactions = await db.query('select transactions.* from transactions join user_table on user_table.id = transactions.user_id where email = $1',[verifiedEmail])
                Promise.resolve(transactions).then(e => dispatch(setTransactions(e.rows)));

             
                socket.emit('data',JSON.stringify({wallet:wallet.rows[0],transactions:transactions.rows}));
        })
        
    }
    
}

