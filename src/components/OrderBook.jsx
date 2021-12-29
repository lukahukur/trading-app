import react,{useEffect,useState,useRef} from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import arrowGreen from './../../src/arrGreen.svg'
import arrowRed from './../../src/arrRed.svg'

function OrderBook({currency,getTrades,fixed}){
 const [wssData,setData] = useState([]); 
 const [isWss,setWss] = useState(false);
const [red,R] = useState([]);
const [green,G] = useState([]); 
const [trades,setTrades] = useState([]);
 //ask = red 
//bid = greem 
// or like this man
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
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@depth10`);
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
        R(red);
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
          { isWss? <span className="orderW">
              <span className="b2">
              <span>Price</span>
              <span>Amount</span>

              </span>
            <div className="top_lvl_orders">
               <ul style={{color:'red'}}>
               {
                  red.map((e,i)=>{
                       return <li key={i} className="LI_P"><span>{parseFloat(e[0]).toFixed(fixed)}</span><span style={{color:'#AFB5BE'}}>{kFormatter(e[1])}</span></li>
                   })
               }
               </ul>
              
            </div>
            <div className="middle_lvl_price">
                <div className="wrapper_t_1" style={!tradePrev|| tradePrev === trades.p ?{color:'white'}: trades.p > tradePrev ?{color:'green'}:{color:'red'}}>
         {parseFloat( trades.p).toFixed(fixed) }<img src={trades.p > tradePrev ?arrowGreen:arrowRed} className="arr" style={!tradePrev|| tradePrev === trades.p ?{display:'none'}: trades.p > tradePrev ?{transform:'rotate(90deg)'}:{transform:'rotate(-90deg)',marginLeft:'8px'}}/>
               
               
                </div>
          
            </div>
            <div className="botttom_lvl_orders">
            <ul style={{color:'green'}}>
            {
                   green.map((e,i)=>{
                       return <li key={i} className="LI_P"><span>{parseFloat(e[0]).toFixed(fixed)}</span><span style={{color:'#AFB5BE'}}>{kFormatter(e[1])}</span></li>
                   })
               }
                </ul>
            </div>
            </span>:
            <span style={{display:'flex',height:'400px',width:'300px',alignItems:'center',justifyContent:'center',alignContent:'center'}}><ScaleLoader color={'#00B7FF'}/></span> }
            </div>

        </react.Fragment>
    )
}

export default OrderBook;