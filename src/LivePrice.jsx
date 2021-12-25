import { useEffect, useState,useRef } from "react/cjs/react.development";
import ScaleLoader from "react-spinners/ScaleLoader";


function LivePrice({currency,tr}){
    const [trades,setTrades] = useState([]);
    const [tHistory,setTHistory] = useState([]);
  const [fetChed,setFetched] = useState(false);
  const refCurrencyNow = useRef('btcusdt');
    useEffect(()=>{
      refCurrencyNow.current = currency;
    });
    const nowCurrency = refCurrencyNow.current;



    useEffect(()=>{
  
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@trade`);
        ws.onmessage = (e)=>{
         
          const parsedData = JSON.parse(e.data);
         
            if(parsedData.s === currency.toUpperCase()){
              setTrades(parsedData);
             tr(parsedData)
            }
          
            setFetched(true); 
      }
   
    

    },[currency]);




    useEffect(()=>{
      if(tHistory.length <=14){
        if(trades.s === currency.toUpperCase()){
          setTHistory(()=>{
       
            let temp = tHistory;
           
            temp.push(trades);
             return[...temp]
             
           });
        } else if(nowCurrency !== currency){
          setTHistory([ ])
          setFetched(false);
        }
        
      
    
    }
    else if(trades.s === currency.toUpperCase()){
    
     let shorter = tHistory;
     shorter = shorter.slice(1,15);
      setTHistory([...shorter,trades]);
     
    }
    else if(nowCurrency !== currency){
      setTHistory([ ])
      setFetched(false);
    }
  
    },[trades,currency])

  

 

  const list = tHistory.map((e,i)=>{
    let date = new Date(e.T);
  if(e.m === false){return <li key={i}  className='JohnJoLi' ><div className='row'> 
  
    <div style={{color:'green'}}>{parseFloat(e.p)
    .toFixed(currency === 'shibusdt'?8:2)
    }</div> <div>{parseFloat(e.q).toFixed(currency === 'shibusdt'?0:5)} </div>  <div>{date.toString().slice(16,25)} </div>  </div></li>;}

  if(e.m === true){return <li key={i}  className='JohnJoLi'>
    
    <div className = 'row'>   <div style={{color:'red'}}>{parseFloat(e.p)
    .toFixed(currency === 'shibusdt'?8:2)
    }</div>  <div>{parseFloat(e.q).toFixed(currency === 'shibusdt'?0:5)}</div>  <div>{date.toString().slice(16,25)}</div> </div></li>;}

  });
 
return(
    
    <div className='price-live' style={fetChed ? {width:'auto'}:{ width: '300px'}}>
     
        
      
{ fetChed ?<div > <div className='lp'><span>Live Trades</span></div> <ul className='flex-column' > <li className='c-w'><span>Price</span>  <span style={{marginLeft:'10px'}}>Amount</span>  <span>Time</span>   </li>{list} </ul> </div>:  <div style={{width:'300px',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>  <ScaleLoader color={'#00B7FF'}/> </div> }
  
      
     </div>

);

}
export default LivePrice;









