import react,{useEffect,useState,useRef} from "react";
import ScaleLoader from "react-spinners/ScaleLoader";


function OrderBook({currency,getTrades,fixed,setPriceVal}){
    function sum(e){
        let a =+ e;
        return a
    }
 const [wssData,setData] = useState([]); 
 const [isWss,setWss] = useState(false);
const [red,R] = useState([]);
const [green,G] = useState([]); 
const [trades,setTrades] = useState([]);
const [fixedState,setFixedState] = useState(2);
useEffect(()=>{
    switch(currency){
        case'xrpusdt':
        setFixedState(0);
        break;
        case 'shibusdt':
            setFixedState(0)
            break;
        case 'dogeusdt':
            setFixedState(4)
            break;
        case 'btcusdt':
            setFixedState(5)
            break; 
        case 'sol':
            setFixedState(5)
            break;
            default: 
            setFixedState(4);
    }
},[currency]);




useEffect(()=>{
  if(typeof(getTrades.p) === 'string'){
    setWss(true)
  }
},[getTrades]);
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
    const refCurrencyNow = useRef('btcusdt');
    useEffect(()=>{
      refCurrencyNow.current = currency;
    });
    const nowCurrency = refCurrencyNow.current;

const tradesP = useRef();
useEffect(()=>{
    if(currency === nowCurrency){
        tradesP.current = trades.p;
    }

},[trades,currency]);

 const tradePrev = tradesP.current;


    useEffect(()=>{
        if(getTrades.s === currency.toUpperCase()){
            setTrades(getTrades);
        } 
        },[getTrades,currency]);
  
    useEffect(()=>{
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@depth10@1000ms`);
        ws.onmessage = (e)=>{
           
           const parsedCuteData = JSON.parse(e.data);
  
            const asks = parsedCuteData.asks;
            const bids = parsedCuteData.bids;
            const final = [currency,asks,bids];
            setData(final)
        //    let finallMap = parsedCuteData.map();
        
        }
        return () => ws.close()
        
    },[currency]);

 

 
useEffect(()=>{
   
    
    if(wssData[0] === currency){
        const [curr,red,green] = wssData;
        R(red.reverse());
        G(green)
      } 
       if(nowCurrency !== currency){
        setWss(false)
     }
  
      
    
},[currency,wssData,isWss]);
    return(
        <react.Fragment>
            <div className="orderbook_wrapper">
                <div className="head">Order Book</div>
            { isWss? <span className="orderW" >
              <span className="b2">
              <span>Price</span>
              <span style={{display:'flex',width:'100px',justifyContent:'right'}}>Amount</span>
              <span>Total</span>
              </span>
            <div className="top_lvl_orders">
               <ul >
               {
                  red.map((e,i,arr)=>{
                       return <li key={i} style={{color:'#b70404'}} className="LI_P" onClick={()=>{setPriceVal(e[0])}}>
                           <span style={{color:'rgb(150, 4, 4)',width:'70px',display:'flex',justifyContent:'left'}} >{parseFloat(e[0]).toFixed(fixed)}</span>
                       <span style={{color:'#AFB5BE',width:'100px',display:'flex',justifyContent:'right'}}>{parseFloat(e[1]).toFixed(fixedState)}</span>
                       
                       
                       
                       <span style={{color:'#AFB5BE',width:'70px',display:'flex',justifyContent:'right'}}>{
                         
                   (e[0]*e[1]).toFixed(1)

                       }</span>
                       </li>
                   })
               }
               </ul>
              
            </div>
            <div className="middle_lvl_price">
                <div className="wrapper_t_1"   style={!tradePrev|| tradePrev === trades.p ?{color:'white'}: trades.p > tradePrev ?{color:'green'}:{color:'rgb(150, 4, 4)'}}>
         <span style={{cursor:'pointer'}} onClick={()=>{setPriceVal(trades.p)}}> {parseFloat( trades.p).toFixed(fixed) }</span>
          {/* <img src={trades.p > tradePrev ?arrowGreen:arrowRed} className="arr" style={!tradePrev|| tradePrev === trades.p ?{display:'none'}: trades.p > tradePrev ?{transform:'rotate(90deg)'}:{transform:'rotate(-90deg)',marginLeft:'8px'}}/> */}
               <span style={{width:'20px',height:'20px'}}>

               
          <svg height="20" viewBox="0 0 24 24"  width='20'preserveAspectRatio="none" className={!tradePrev|| tradePrev === trades.p?'displayNone':'displayBlock'} style={trades.p > tradePrev?{transform:'rotate(0deg)',opacity:1,fill:'green'}:{transform:'rotate(180deg)',opacity:1,fill:'rgb(150, 4, 4)'}}>
<path d="M5 13.47l1.41-1.41 5.1 5.1V3h1.99v14.15l5.09-5.09L20 13.47l-7.5 7.5-7.5-7.5z" />

</svg>
</span>
                <span style={{color:'rgb(132, 142, 156)',fontSize:'13px',height:'20px',display:'flex',fontFamily:'plex', 
                alignItems:'flex-end',
                marginLeft:'4px',
                padding:0,
            
            
            }}>${parseFloat(tradePrev).toFixed(fixed)}</span>
               
                </div>
          
            </div>
            <div className="botttom_lvl_orders">
            <ul style={{color:'green'}}>
            {
                   green.map((e,i)=>{
                       return <li key={i} className="LI_P" onClick={()=>{setPriceVal(e[0])}}>
                           <span style={{color:'green',width:'70px',display:'flex',justifyContent:'left'}} >{parseFloat(e[0]).toFixed(fixed)}</span>


                       
                       <span style={{color:'#AFB5BE',width:'100px',display:'flex',justifyContent:'right'}}>{parseFloat(e[1]).toFixed(fixedState)}</span>
                       
                       
                       
                       <span style={{color:'#AFB5BE',width:'70px',display:'flex',justifyContent:'right'}}>{
                         
                         (e[0]*e[1]).toFixed(1)

                       }</span>
                       
                       
                       
                       </li>
                   })
               }
                </ul>
            </div>
            </span>:
            <span style={{display:'flex',height:'400px',width:'300px',alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                <ScaleLoader color={'#00B7FF'}/>
                
                </span> }
            </div>
      
        </react.Fragment>
    )
}

export default OrderBook;