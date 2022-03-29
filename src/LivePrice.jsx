import { useEffect, useState,useRef } from "react/cjs/react.development";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCallback, useMemo } from "react";
import react from "react";


function LivePrice({currency,tr,fixed,setCondition,setPriceVal}){
    const [trades,setTrades] = useState([]);
    const [tHistory,setTHistory] = useState([]);
  const [fetChed,setFetched] = useState(false);
  const refCurrencyNow = useRef('btcusdt');
    useEffect(()=>{
      refCurrencyNow.current = currency;
    });
    const nowCurrency = refCurrencyNow.current;
    const refTrades = useRef();
    useEffect(()=>{
      refTrades.current = trades;
    });
    const nowTrades = refTrades.currency;




    useEffect(()=>{
  
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@aggTrade`);
        ws.onmessage = (e)=>{
         
          const parsedData = JSON.parse(e.data);
       
            if(parsedData.p !== nowTrades){
              setTrades(parsedData);
             tr(parsedData)
             setFetched(true); 
             setCondition(true)
           
            }
          
      
      }
   
    
      return () => ws.close()
    },[currency]);


useEffect(()=>{
  async function resp(){
  const response = await fetch(`https://api3.binance.com/api/v3/aggTrades?symbol=${currency.toUpperCase()}&limit=19`);
  let data = await response.json();
 
  setTHistory([...data])
  
  }
  resp();
},[currency]);

    useEffect(()=>{
      if(tHistory.length <=18){
          setTHistory(()=>{
       
            let temp = tHistory;
           
            temp.unshift(trades);
             return[...temp]
             
           });
    }else{
     
    
    
    
     setTHistory(()=>{
      let shorter = tHistory;
     shorter.pop();
      shorter.unshift(trades)
      return[...shorter]

     });
 
      // setTHistory([...shorter,trades]);
     
    }
   
    },[trades,currency])

  

    function kFormatter(num) {
      return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  const list = tHistory.map((e,i)=>{
    let date = new Date(e.T);
  if(e.m === false){return <li key={i}  className='JohnJoLi' onClick={()=>{setPriceVal(e.p)}}><div className='row'> 
  
    <div style={{color:'green'}}>{parseFloat(e.p)
    .toFixed(fixed)
    }</div> 
    
    <div className="e_q">{kFormatter(e.q)} </div>  <div>{date.toString().slice(16,25)} </div>  </div></li>;}

  if(e.m === true){return <li key={i}  className='JohnJoLi' onClick={()=>{setPriceVal(e.p)}}>
    
    <div className = 'row'>   <div style={{color:'rgb(150, 4, 4)'}}>{parseFloat(e.p)
    .toFixed(fixed)
    }</div>  <div className="e_q">{kFormatter(e.q)}</div>  <div>{date.toString().slice(16,25)}</div> </div></li>;}

  });


 
 
return(
    
    <div className='price-live' style={fetChed ? {width:'auto'}:{ width: 'auto'}}>
     
        
      
{ fetChed ?<div > <div className='lp'><span>Live Trades</span></div> <ul className='flex-column' > <li className='c-w'><span>Price</span>  <span style={{marginLeft:'46px'}}>Amount</span>  <span>Time</span>   </li>{list} </ul> </div>:  <div style={{width:'321px',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>  <ScaleLoader color={'#00B7FF'}/> </div> }
  
      
     </div>

);

}
export default react.memo( LivePrice,(prevProps, nextProps)=>{
  if(prevProps!==nextProps){
    return true
  }else{
    return false
  }
});









