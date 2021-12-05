import { useEffect, useState } from "react/cjs/react.development";


function LivePrice({currency}){
    const [trades,setTrades] = useState([]);
    const [tHistory,setTHistory] = useState([]);





    useEffect(()=>{
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@trade`);
        ws.onmessage = (e)=>{
                const parsedData = JSON.parse(e.data);
                setTrades(parsedData);
               
                
        }
        
    },[]);
    useEffect(()=>{
      if(tHistory.length <=16){
     setTHistory(()=>{
      let temp = tHistory;
      temp.push(trades);
       return[...temp]
     });
    }else{
     let shorter = tHistory;
     shorter = shorter.slice(1,17);
      setTHistory([...shorter,trades]);
     
    }
    // setTHistory([...tHistory,trades]);
    },[trades])
 
   

 

  const list = tHistory.map((e,i)=>{
    let date = new Date(e.T);
  if(e.m === false){return <li key={i}  className='JohnJoLi' ><div className='row'>   <div style={{color:'green'}}>{parseFloat(e.p).toFixed(2)}</div> <div>{e.q} </div>  <div>{date.toString().slice(16,25)} </div>  </div></li>;}
  if(e.m === true){return <li key={i}  className='JohnJoLi'><div className = 'row'>   <div style={{color:'red'}}>{parseFloat(e.p).toFixed(2)}</div>  <div>{e.q}</div>  <div>{date.toString().slice(16,25)}</div> </div></li>;}
  });
 
return(
    
    <div className='price-live'>
        <div className='c-w'><span>price</span>  <span>Aomunt</span>  <span>Time</span>   </div>
        <ul className='flex-column' >
        {
         list
        }
        
        </ul>
       
     </div>

);

}
export default LivePrice;









