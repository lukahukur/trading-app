import { typedUseSelector } from "../store";
import React,{useEffect,useRef,useState} from "react";
import {TdepthRestApi, WsResponseTypeTrade} from '../types/index'
import {FC} from 'react'
import styles from '../styles/data.module.scss'
import Arrow from "./arrow";

const Orders:FC<{response:TdepthRestApi}> = ({response})=>{
    const market = typedUseSelector(state => state.market.market);
    const [data,setData] = useState<TdepthRestApi | undefined>();
    const trades = typedUseSelector(state => state.binanceStreamSlice.data);
    const tradesPrevValue = useRef<WsResponseTypeTrade|undefined>();


    useEffect(()=>{
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${market}@depth10@1000ms`);
        function messageHandler(__data:any){
            let data:TdepthRestApi = JSON.parse(__data.data);
            setData({
                asks:data.asks,
                bids:data.bids,
                lastUpdateId:data.lastUpdateId
            })
        }

        ws.addEventListener('message',messageHandler)
        return ()=>{
           ws.close();
           ws.removeEventListener('message',messageHandler)
        }
    },[market])
    

    useEffect(()=>{
       if(response){
           setData(response)
       }
    },[response])

    useEffect(()=>{
        tradesPrevValue.current = trades;
    },[trades]);
    const isEqual = tradesPrevValue.current?.p&& Number(tradesPrevValue.current?.p) === Number(trades.p);
    const isBigger = tradesPrevValue.current?.p&& Number(tradesPrevValue.current?.p)>Number(trades.p);

    const bids = data && data.bids.map((e,i)=>{
        let N = (e:string) => Number(e);
        let p =N(e[0]);
        let q = N(e[1]);
        return  <li key={i} className='grid justify-between items-center grid-cols-2'>
                    <span className='flex w-52 justify-between'>
                        <span className='w-22 text-red-600 items-center'>{p}</span>
                        <span className='w-22 text-gray-300 flex justify-end items-end'>{q}</span>
                    </span>
                    <span className='text-gray-300 flex justify-end items-end'>{Number(p*q).toFixed(2)}</span>                    
                </li>
    })
    const asks = data && data.asks.map((e,i)=>{
        let N = (e:string) => Number(e);
        let p =N(e[0]);
        let q = N(e[1]);
        return  <li key={i} className='grid justify-between items-center grid-cols-2'>
                    <span className='flex w-52 justify-between'>
                        <span className='w-22 text-green-600 items-center'>{p}</span>
                        <span className='w-22 text-gray-300 flex justify-end items-end'>{q}</span>
                    </span>
                    <span className='text-gray-300 flex justify-end items-end'>{Number(p*q).toFixed(2)}</span>                    
                </li>
    })
    return(
        <span className={styles.order_wrapper}>
            <span style={{fontFamily:'bPl'}}>
                <span className='text-white grid w-full px-4 mt-3 grid-cols-2'>
                    <span className='flex w-52 justify-between'>
                        <span className='w-22 items-center'>Price</span>
                        <span className='w-22 flex justify-end items-end'>Amount</span>
                    </span>
                    <span className='flex justify-end items-end'>Total</span>
                </span>
               <ul className={styles.prices}>
                    {bids}
               </ul>
            </span>


            <div className={styles.curr_price}>
                {tradesPrevValue.current?.p && 
                    <span className="flex items-center justify-start"> 
                        <span className='flex items-center min-w-1/2 max-w-28 '>
                            <span style={{width:'20px'}}>
                                <Arrow isBigger={
                                    Number(tradesPrevValue.current?.p) === Number(trades.p)?'hide':
                                    Number(tradesPrevValue.current?.p) > Number(trades.p)
                                }/>
                            </span>
                            <span style=
                                        {
                                        isEqual?{color:'white'}:isBigger?{color:'red'}:{color:'green'}
                                        } 
                                        className='min-w-1/4'
                                        >
                                {trades.p && Number(trades.p)}
                            </span>
                        </span>
                        <span className='flex items-center text-textSecondary justify-start text-sm'>
                        {Number(tradesPrevValue.current.p)}
                        </span>
                    </span>
                }
            </div>


            <span style={{fontFamily:'bPl'}}>
               <ul className={styles.prices}>
                    {asks}
               </ul>
            </span>
        </span>
    )
}
export default React.memo(Orders);