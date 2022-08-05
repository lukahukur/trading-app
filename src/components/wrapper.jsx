import '../css/app.css'
import { startConnecting } from "../store/dataSlice";
import React,{useEffect} from "react";
import ChartWrapper from "./top/chartwrapper";
import { useDispatch } from "react-redux";
import LiveTrades from "./bottom/liveTrades";
import { OrderBook } from "./top/orderBook";
import { Orders } from "./bottom/Order";
import TransactionForm from "./transactionform"; 
import { changeSymbol } from '../store/symbolSlice';

function Wrapper ({currency})
{
    const dispatch = useDispatch();
    dispatch(changeSymbol(currency))
    
    useEffect(()=>{
       return ()=>{
          dispatch(startConnecting());
        }
      },[])
return(
<div id='wrapper' >
  
        <div className='w_p'>
        <div id='fRow' >
        <ChartWrapper />
        <Orders/>
    </div>
    <div id='sRow'>
    <OrderBook/>
     
        <LiveTrades/>
    </div>
    
    <TransactionForm/>
 </div>   
  

</div>
);

}
export default Wrapper