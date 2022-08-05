import React, {useEffect} from "react";
import { useGetTradesQuery } from "../../store/dataQuery";
import {useSelector } from "react-redux";



let Arr = [];

function LiveTrades(){
const side = useSelector(state => state.symbol.symbol);
const stream400ms = useSelector(state=> state.data.stream400ms)
/*
trade history
*/
const {data ='',isLoading,} = useGetTradesQuery({c:20,s:side.toUpperCase()})

useEffect(()=>{
  Arr = []
let tmp = isLoading === false ? data.map((e)=>{
    let dateTMP = new Date(e.T);
   
    return {
        price:Number(e.p),
        buyer:e.m,
        amount:e.q,
        time:[
       dateTMP.getHours(),
       dateTMP.getMinutes(),
       Number(dateTMP.getSeconds()) < 10 ? "0"+ dateTMP.getSeconds():dateTMP.getSeconds()
        ],

    }
}):undefined;
   
   if(tmp){
   Arr.push(...tmp)
   }

},[data])


useEffect(()=>{
   
        
        if(stream400ms !== '' ){
            var date = new Date(stream400ms.T);
            let TMP = {
                    price:Number(stream400ms.p),
                    buyer:stream400ms.m,
                    amount:stream400ms.q,
                    time:[
                        date.getHours(),
                        date.getMinutes() ,
                        Number(date.getSeconds()) < 10 ? "0"+ date.getSeconds():date.getSeconds()
                    ]}
       
       
        
       if(stream400ms.m !== ''){ 

            if(Arr.length < 20 ){
               Arr.push(TMP)
                     }      
                else{
                     Arr.pop();
                     Arr.unshift(TMP)
           
                    }

        }
    }
   
   
},[side,stream400ms])

    return(
        <div id='tradeWrapper'>
            <div className="height pddding" style={{'border':'1px solid var(--border)','borderLeft':'none', 'borderRight':'none','fontSize':'20px' }}>Market Trades</div>
            <div id='hd' className='pddding'>
                <div className="cntr">
                <span className='gray'>Price</span>
                </div>
                <div className="cntr rght" >
                <span className='gray'>Amount</span>
                </div>
                <div className="cntr rght">
                <span className='gray'>Time</span>
                </div>
            </div>
        <ul id="trades">

            {stream400ms !== '' && Arr.map((e,i)=>{
                return <li className='pddding' key={i} id='li' >
            <div>

                <div style={e.buyer === true ? {'color':'#F6465D'}:{'color':'#0ECB81'}} className='cntr'>{e.price}</div>
            
            </div>
            <div >

              <div className="cntr rght">{Number(e.amount)}</div> 

            </div>
            <div >

    <div className="cntr rght">{e.time[0]}:{e.time[1]}:{e.time[2]}</div> 

    </div>
            </li>
            })
            
            }
           
        </ul>
        </div>
    )
}
export default LiveTrades;